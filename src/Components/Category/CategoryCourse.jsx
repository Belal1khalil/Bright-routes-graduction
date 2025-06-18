/* eslint-disable react/prop-types */


// eslint-disable-next-line react/prop-types
export default function CategoryCourse({courseInfo}) {
  console.log(courseInfo)
  return (
    <>
  <div className="course-Card  shadow-lg rounded-md py-4 overflow-hidden w-80">
   <div className="relative">
   <img 
    className="w-80 h-80 object-cover"
    // eslint-disable-next-line react/prop-types
    src={courseInfo.pictureUrl} 
    alt="" />
    <div className="space-x-2 absolute w-full h-full -bottom-60  ml-10 ">
        <button className="btn bg-primary-500 font-bold text-white">Read More</button>
        <button className="btn bg-primary-500 font-bold  text-white">Join now</button>
    </div>
    <div className="flex flex-col justify-center items-center space-y-2">
      <p className=" text-xl font-semibold py-3">{courseInfo.price} L.E</p>
      <p className=" text-primary-500 text-xl  ">4.8</p>
      <p className="px-3 text-center font-bold text-xl  ">{courseInfo.name}</p>
    </div>
    <div className="flex flex-col gap-6 px-2 mt-4 ">
        <p className=" px-2 "> Name: {courseInfo.instructorName}</p>
        <p className="">Created Date : {courseInfo.createdDate}</p>
        <p className=" px-1"> Updated Date : {courseInfo.updatedDate}

        </p>
    </div>
   </div>
  </div>
 
    </>
  )
}

