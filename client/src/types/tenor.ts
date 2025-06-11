export interface TenorPaginatedResponse<T> {
  next: string
  results: T[]
}

export interface TenorCategoriesResponse {
  locale: string
  tags: GifCategory[]
}

export type TenorSearchResponse = TenorPaginatedResponse<GifResult>

interface GifResultMediaFormat {
  dims: number[]
  duration: number
  preview: string
  size: number
  url: string
}

export interface GifResult {
  id: string
  title: string
  url: string
  content_description: string
  content_description_source: string
  created: number
  flags: string[]
  hasaudio: boolean
  itemurl: string
  media_formats: Record<string, GifResultMediaFormat>
  tags: string[]
}

export interface GifCategory {
  searchterm: string
  name: string
  image: string
  path: string
}
