import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('teste exam#ple teste middleware-@ lkkkeeeee opa')

  expect(slug.value).toEqual('teste-example-teste-middleware-lkkkeeeee-opa')
})