const fs = require('fs');
const routes = fs.readdirSync(__dirname+'/../routes').map(route => {
    if(route=="index.js") {
        return ""
    }
    return route.split(".")[0]
});

const layouts = getLayouts(__dirname+"/../views");

function getLayouts(path) {
    let files = fs.readdirSync(path);
    let layoutpaths = []
    files.forEach(file => {
        let filepath = path + "/" + file
        let stats = fs.lstatSync(filepath)
        if(stats.isDirectory()) {
            layoutpaths.push(...getLayouts(filepath));
        } else if(stats.isFile()) {
            if(file == "layout.ejs") {
                layoutpaths.push(path)
            }
        }
    })
    return layoutpaths.map(path => {
        path = path.replace(__dirname, "");
        path = path.replace("../views","");
        path = path.replace("/","");
        return path
    })
}

function setLayout(req, res, next) {
    let baseurl = req.url.split("/")[1]?req.url.split("/")[1]:""
    console.log(baseurl)
    console.log(layouts);
    console.log(routes);
    if(routes.includes(baseurl)) {
        if(layouts.includes(baseurl)) {
            console.log("Has layout")
            if(baseurl=="") {

            } else {
                req.app.set("layout", baseurl+"/"+"layout")
            }
        }
    }
    next()
}

module.exports=setLayout
