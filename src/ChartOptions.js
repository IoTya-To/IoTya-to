export class ChartOptions {
  chartTitle = ''
  datasets = []
  id = ''
  constructor (chartTitle, datasets, id) {
    this.chartTitle = chartTitle
    this.datasets = datasets
    this.id = id
  }
}
