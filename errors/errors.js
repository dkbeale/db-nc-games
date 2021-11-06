exports.handle404Err = ((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ msg: err.msg })
    } else {
        next(err);
    }
})

exports.handle400Err = ((err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({ msg: err.msg })
    } else {
        next(err)
    }
})

exports.handle200Err = ((err, req, res, next) => {
    if (err.status === 200) {
        res.status(200).send({ msg: err.msg, results: err.results})
    } else {
        next(err)
    }
})

