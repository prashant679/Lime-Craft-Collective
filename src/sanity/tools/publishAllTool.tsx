import React, { useState, useEffect, useCallback } from 'react'
import { useClient } from 'sanity'
import { Box, Card, Stack, Text, Button, Flex, Badge, Spinner } from '@sanity/ui'
import { PublishIcon, CheckmarkIcon, RefreshIcon } from '@sanity/icons'

export const PublishAllTool: React.FC = () => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [drafts, setDrafts] = useState<Array<{ _id: string; _type: string; caption?: string; title?: string; name?: string }>>([])
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const fetchDrafts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await client.fetch<Array<{ _id: string; _type: string; caption?: string; title?: string; name?: string }>>(
        `*[_id in path("drafts.**")]{_id, _type, caption, title, name}`
      )
      setDrafts(res || [])
    } catch (err) {
      console.error('Error fetching drafts:', err)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    fetchDrafts()
  }, [fetchDrafts])

  const handlePublishAll = async () => {
    if (drafts.length === 0) return
    setPublishing(true)
    setStatusMessage(null)

    try {
      let publishedCount = 0
      for (const draft of drafts) {
        // Fetch full draft content
        const fullDraft = await client.fetch(`*[_id == $id][0]`, { id: draft._id })
        if (!fullDraft) continue

        const publishedId = draft._id.replace(/^drafts\./, '')
        const { _id, _updatedAt, _createdAt, _rev, ...content } = fullDraft

        const tx = client.transaction()
        tx.createOrReplace({
          ...content,
          _id: publishedId,
        })
        tx.delete(draft._id)
        await tx.commit()
        publishedCount++
      }

      setStatusMessage(`Successfully published ${publishedCount} draft(s)!`)
      await fetchDrafts()
    } catch (err: any) {
      console.error('Failed to publish all drafts:', err)
      setStatusMessage(`Error publishing drafts: ${err.message || 'Unknown error'}`)
    } finally {
      setPublishing(false)
    }
  }

  return (
    <Box padding={4} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card padding={4} radius={3} shadow={1}>
        <Stack space={4}>
          <Flex align="center" justify="space-between">
            <Stack space={2}>
              <Text size={3} weight="bold">
                Publish All Drafts
              </Text>
              <Text size={1} muted>
                Publish all pending draft changes across your entire Sanity Studio dataset in one click.
              </Text>
            </Stack>
            <Button
              icon={RefreshIcon}
              mode="ghost"
              title="Refresh drafts list"
              onClick={fetchDrafts}
              disabled={loading || publishing}
            />
          </Flex>

          {statusMessage && (
            <Card padding={3} radius={2} tone={statusMessage.startsWith('Error') ? 'critical' : 'positive'}>
              <Text size={1}>{statusMessage}</Text>
            </Card>
          )}

          {loading ? (
            <Flex align="center" justify="center" padding={5}>
              <Spinner />
            </Flex>
          ) : drafts.length === 0 ? (
            <Card padding={4} radius={2} tone="positive">
              <Flex align="center" gap={3}>
                <CheckmarkIcon style={{ fontSize: 24 }} />
                <Text weight="semibold">All set! There are currently no pending drafts to publish.</Text>
              </Flex>
            </Card>
          ) : (
            <Stack space={4}>
              <Flex align="center" justify="space-between">
                <Text size={2} weight="bold">
                  Pending Drafts ({drafts.length})
                </Text>
                <Button
                  icon={PublishIcon}
                  text={publishing ? 'Publishing...' : `Publish All (${drafts.length} Drafts)`}
                  tone="primary"
                  onClick={handlePublishAll}
                  disabled={publishing}
                />
              </Flex>

              <Stack space={2}>
                {drafts.map((d) => (
                  <Card key={d._id} padding={3} radius={2} border>
                    <Flex align="center" justify="space-between">
                      <Stack space={1}>
                        <Text size={1} weight="medium">
                          {d.caption || d.title || d.name || d._id}
                        </Text>
                        <Text size={0} muted>
                          {d._id}
                        </Text>
                      </Stack>
                      <Badge tone="caution">{d._type}</Badge>
                    </Flex>
                  </Card>
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Card>
    </Box>
  )
}
