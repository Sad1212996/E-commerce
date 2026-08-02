import mongoose from 'mongoose';

const homeSliderSchema = mongoose.Schema({
    images: [
        {
            type: String,
            required: true,
        }
    ],
    catId: {
        type: String,
        default: ""
    },
    subCatId: {
        type: String,
        default: ""
    },
    productId: {
        type: String,
        default: ""
    },
    customUrl: {
        type: String,
        default: ""
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
},{
    timestamps : true
});


const HomeSliderModel = mongoose.model('HomeSlider',homeSliderSchema)

export default HomeSliderModel