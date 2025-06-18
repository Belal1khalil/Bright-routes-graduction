


// import { useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function VideoPlayer() {
//   const videoRef = useRef(null);
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const videoUrl = queryParams.get("videoUrl");
//   const videoname = queryParams.get("videoname");
//   const videoid = queryParams.get("videoid");

  



//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchVideo = async () => {
//       try {
//         const response = await fetch(
//           `https://brightminds.runasp.net/api/Video/stream/${videoid}?fileName=${videoUrl}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Video fetch failed");
//         }

//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob);
//         if (videoRef.current) {
//           videoRef.current.src = url;
//         } 
//       } catch (error) {
//         console.error("Error loading video:", error);
//       }
//     };

//     if (videoid && videoname) {
//       fetchVideo();
//     }
//   }, [videoid, videoname]);



//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen p-6">
//         <div className="max-w-4xl w-full rounded-lg shadow-xl overflow-hidden">
//           {/* Video Title Section */}
//           <div className="p-6 border-b">
//             <h1 className="text-3xl font-bold mb-1 text-center">{videoname}</h1>
//           </div>

//           {/* Video Player */}
//           <div className="relative">
//             <video
//               ref={videoRef}
//               className="w-full aspect-video"
//               controls
//               autoPlay
//               muted
//             >
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       </div>

//       <Link to={`/quiz?videoId=${videoid}`} >
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md block mx-auto">
//           Take Quiz
//         </button>
//       </Link>
//     </>
//   );
// }






























import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get("videoUrl");
  const videoname = queryParams.get("videoname");
  const videoid = queryParams.get("videoid");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://brightminds.runasp.net/api/Video/stream/${videoid}?fileName=${videoUrl}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Video fetch failed");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.src = url;
        }
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };

    if (videoid && videoname) {
      fetchVideo();
    }
  }, [videoid, videoname]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-6 ">
        <div className="max-w-4xl w-full rounded-xl shadow-2xl bg-white overflow-hidden">
          {/* عنوان الفيديو */}
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold mb-1 text-center text-gray-800">
              {videoname}
            </h1>
          </div>

          {/* مشغل الفيديو */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className="w-full aspect-video"
              controls
              autoPlay
              muted
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* زر Take Quiz */}
          <div className="p-6">
            <div className="flex justify-center">
              <Link to={`/quiz?videoId=${videoid}`}>
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 active:scale-95">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 8.25v-1.5a3 3 0 00-3-3h-3a3 3 0 00-3 3v1.5M5.25 20.25h13.5M9 15.75h6"
                    />
                  </svg>
                  Take Quiz
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
