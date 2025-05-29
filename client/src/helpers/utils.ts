import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers
} from 'obscenity'

const englishProfanityMatcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers
})

export const breakpointsConfig = {
  xs: 321,
  sm: 567,
  md: 768,
  lg: 991,
  xl: 1200,
  xxl: 1366
}

export const hasProfanity = (text: string) => {
  return englishProfanityMatcher.hasMatch(text)
}

export const censorProfanity = (text: string) => {
  const censor = new TextCensor()
  const matches = englishProfanityMatcher.getAllMatches(text)
  return censor.applyTo(text, matches)
}
