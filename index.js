const express= require('express')
const cors = require('cors')
const {PrismaClient} = require('@prisma/client')
const app=express();
app.use(cors());
app.use(express.json());
const prisma=new PrismaClient();

app.post('/api/v1/create', async(req,res)=>{
    const data=req.body.data;
       if(data.firstName==="" || data.lastName==="" || data.city==="" || data.phone===""){
       return res.json({
            msg: "Invalid Input",
            status: 411
        })
       }
    const user=await prisma.user.create({
         data, 
    });
    return res.json({
        msg: "User created",
        status:200,
    })
});

app.post('/api/v1/delete', async(req,res)=>{
    // console.log(req.body);
    const id=req.body.data.id;

    const transaction=await prisma.$transaction(async()=>{

    const userDetail= await prisma.user.findFirst({
        where:{
            id:id
        }
    });
    if(!userDetail){
        return res.json({
            msg: "User not found",
            status: 404
        })
    }


    await prisma.restore.deleteMany({});


     await prisma.restore.create({
        data:{
        userId: userDetail.id,
        firstName: userDetail.firstName,
        lastName:userDetail.lastName,
        city:userDetail.city,
        phone:userDetail.phone
        }
    });

     await prisma.user.delete({
        where:{
            id:id
        }
    });
   
    return res.json({
        msg: "Deleted Successfully",
        status: 200
    })
})
// return res.json({
//     msg :transaction.msg,
//     status:transaction.status
// })
})

app.get('/api/v1/users', async(req,res)=>{
    const users=await prisma.user.findMany({});
    return res.json({
        users,
    })
})


app.post('/api/v1/update', async (req, res) => {
    const id = Number(req.body.id);
    const { firstName, lastName, phone, city } = req.body.formData;
    const updatedData = {};

    if (firstName) {
        updatedData.firstName = firstName;
    }
    if (lastName) {
        updatedData.lastName = lastName;
    }
    if (city) {
        updatedData.city = city;
    }
    if (phone) {
        updatedData.phone = phone;
    }

    try {
        await prisma.user.update({
            where: {
                id: id,
            },
            data: updatedData,
        });
        return res.json({
            msg: "Data Updated Successfully",
            status: 200
        });
    } catch (error) {
        return res.status(500).json({
            msg: "An error occurred while updating data",
            error: error.message,
        });
    }
});

app.listen(3000, ()=>{
    console.log("server started");
})


