import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const userData = [
  {
    username: "rkw",
    password: "source",
    email: "derekliman63@gmail.com",
    articles: {
      create: {
        title: "first",
        description: "prisma+node",
      },
    },
  },
  {
    username: "aaa",
    password: "aaa",
    email: "aaa@gmail.com",
    articles: {
      create: {
        title: "second",
        description: "prisma+node",
        published:true
      },
    },
  },
]
async function main(){
  for(const item of userData){
    const user = await prisma.user.create({
      data: item,
    })
    console.log((await user).userId)
  }
}


main().then(()=>{
  prisma.$disconnect();
}).catch((err)=>{
  console.log(err);
  prisma.$disconnect();
  process.exit(1);
})