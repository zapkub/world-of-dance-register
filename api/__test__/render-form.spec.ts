import { renderFormToHTML, renderFormToPDF } from "../pdf-generate";

const dump = require('./dump.json')


describe('trender form test', () => {
  it('should render correclty',() => {
    const result = renderFormToHTML(dump)
    renderFormToPDF(dump, './test.pdf')
    expect(result).toEqual(expect.anything())
  })

})