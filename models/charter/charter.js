const vega = require('vega')
const fs = require('fs')

function createCharter() {

    return {
        /**
         * Guarda el gráfico generado como una imagen .png
         * @param path string con la ruta a guardar el grafico
         * @param fileName string con el nombre del grafico sin extension
         * 
         */
        createChart: (values, xField, yField) => {
            const spec = buildSpec(values,xField,yField)
            const view = new vega.View(vega.parse(spec), {
                render: 'none'
            })
                .initialize()
                .finalize()
            return view
        },
        saveChart: (chart,path, fileName) => {
            chart.toCanvas()
                .then(function (canvas) {
                    fs.writeFileSync(`${path}/${fileName}.png`, canvas.toBuffer())
                })
                .catch(function (err) {
                    throw err
                })
        }
    }
}

function buildSpec(values, xField, yField) {
    const spec = {
        "width": 400,
        "height": 200,
        "padding": 5,

        "data": [
            {
                "name": "table",
                "values": values
            }
        ],

        "scales": [
            {
                "name": "xscale",
                "type": "band",
                "domain": { "data": "table", "field": `${xField}` },
                "range": "width",
                "padding": 0.05,
                "round": true
            },
            {
                "name": "yscale",
                "domain": { "data": "table", "field": `${yField}` },
                "nice": true,
                "range": "height"
            }
        ],

        "axes": [
            { "orient": "bottom", "scale": "xscale" },
            { "orient": "left", "scale": "yscale" }
        ],

        "marks": [
            {
                "type": "rect",
                "from": { "data": "table" },
                "encode": {
                    "enter": {
                        "x": { "scale": "xscale", "field": `${xField}` },
                        "width": { "scale": "xscale", "band": 1 },
                        "y": { "scale": "yscale", "field": `${yField}` },
                        "y2": { "scale": "yscale", "value": 0 }
                    },
                    "update": {
                        "fill": { "value": "steelblue" }
                    }
                }
            },
            {
                "type": "text",
                "encode": {
                    "enter": {
                        "align": { "value": "center" },
                        "baseline": { "value": "bottom" },
                        "fill": { "value": "#333" }
                    }
                }
            }
        ]
    }
    return spec
}


module.exports = {
    createCharter
}