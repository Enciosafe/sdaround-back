import PostModel from '../Models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something wrong with tags list'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something wrong with articles list'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate({
          _id: postId,
        },
            { $inc: {viewsCount: 1} },
            { returnDocument: 'after'},
            (err, doc) => {
                if(err) {
                    return res.status(500).json({
                        message: 'Something wrong with this article'
                    })
                }

                if(!doc) {
                    return res.status(404).json({
                        message: 'This article is not found'
                    })
                }

                res.json(doc)
            }
            )
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something wrong with this article'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if(err) {
                return res.status(500).json({
                    message: 'Something wrong with removing this article'
                })
            }

            if(!doc) {
                return res.status(404).json({
                    message: 'This article is not found'
                })
            }

            res.json({
                success: true
            })
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something wrong with this article'
        })
    }
}


export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something wrong with your article'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await  PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        res.json({
            success: true
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Something wrong with updating your article'
        })
    }
}
