const sanpham = require('../../database/models/sanpham');
const { ENUM } = require('../../utils/index');
const { Op } = require("sequelize");

module.exports = {
    // Creating sanpham
    // create: async(res) => {
    //     console.log(sanpham);
    //     try {
    //         return await sanpham.create({
    //             name: res.name,
    //             email: res.email,
    //             category_id: res.category_id,
    //             phone_number: res.phone_number,
    //             state: ENUM.PENDING
    //         })
    //     } catch (error) {
    //         return error
    //     }

    // },
    // Updating sanpham
    // update: async(res) => {
    //     console.log(sanpham);
    //     try {
    //         return await sanpham.update({
    //             name: res.name,
    //             email: res.email,
    //             category_id: res.category_id,
    //             phone_number: res.phone_number
    //         }, {
    //             where: {
    //                 id: res.id
    //             }
    //         })
    //     } catch (error) {
    //         return error
    //     }

    // },
    // get one sanpham
    getOne: async(id) => {
        try {
            return await sanpham.findOne({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    },
    // get many san pham
    getMany: async(body) => {
        let limit = body.limit;
        let offset = body.offset;
        let quyen = body.quyen;
        let nhomsanpham_id = body.nhomsanpham_id || "";
        try {
            return await sanphamDTO.findAll({
                where: {
                    nhomsanpham_id: nhomsanpham_id,
                    state: quyen == "admin" ? "" : ENUM.ENABLE
                },
                order: [
                    ['ngaytao', 'DESC']
                ],
                offset: offset,
                limit: limit
            })
        } catch (error) {
            return error
        }
    },
    // disable sanpham
    disable: async(id) => {
        try {
            return await sanpham.update({
                state: ENUM.DISABLE
            }, {
                where: {
                    id: res.id
                }
            })
        } catch (error) {
            return error
        }
    },
    // disable sanpham
    getAll: async() => {
        try {
            return await sanpham.findAll();
        } catch (error) {
            return error
        }
    }
}