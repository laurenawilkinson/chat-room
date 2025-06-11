import { RequestHandler, Router } from 'express'

const router = Router()
const apiKey = process.env.TENOR_API_KEY

const requireTenorApiKey: RequestHandler = (req, res, next) => {
  if (!apiKey) {
    return res.status(500).json({ error: 'Tenor API key is required' })
  }
  next()
}

const post: RequestHandler = async (req, res) => {
  try {
    const { url, params = {} } = req.body

    if (!url) {
      return res.status(400).json({ error: 'Request URL is required' })
    }

    const endpoint = new URL(url)
    const searchParams = new URLSearchParams({
      ...endpoint.searchParams,
      ...params,
      key: apiKey,
      contentfilter: 'medium',
    })
    endpoint.search = searchParams.toString()

    const response = await fetch(endpoint)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Tenor' })
  }
}

router.post('/', requireTenorApiKey, post)

export default router
