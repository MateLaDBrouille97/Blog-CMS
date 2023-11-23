import prismadb from '@/lib/prismadb';
import React from 'react';


 async function TasksAndColumns ({
    params
  }: {
    params: { blogId: string , columnId:string }
  }) {

    // const columns = await prismadb.columnBoard.findMany({
    //     where: {
    //       blogId: params.blogId
    //     },
    //     orderBy: {
    //       createdAt: 'desc'
    //     }
    // });
    
    // const tasks = await prismadb.task.findMany({
    //     where: {
    //       columnId: params.columnId,
    //     },
    //     orderBy: {
    //       createdAt: 'desc'
    //     }
    // });
    

 }

 export default TasksAndColumns;