import { JSONPath } from 'jsonpath-plus'

export default {
  fetch: async req => {
    const { pathname, search } = new URL(req.url)
    const [_, path, ...target] = pathname.split('/')
    const json = await fetch('https://' + target.join('/') + search, req).then(res => res.json())
    return new Response(JSON.stringify(JSONPath({path, json, preventEval: true, flatten: true}), null, 2), { headers: { 'content-type': 'application/json; charset=utf8' }})
  }
}
