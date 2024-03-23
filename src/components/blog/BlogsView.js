import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBlogById } from '../../redux/blog/blogSlice';

export default function BlogsView() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const blogView = useSelector((state) => state.blog.blogPosts);
  const blog = useSelector((state) => state.blog.currentBlog);
  const status = useSelector((state) => state.blog.blogByIdStatus);
  const error = useSelector((state) => state.blog.error);

  useEffect(() => {
    if (status === 'idle' || (status === 'succeeded' && blog && blog.id !== id)) {
      dispatch(fetchBlogById(id));
    }
  }, [status, id, blog, dispatch]);

  if (status === 'loading') {
    return <div className='bg-light d-flex  justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
      <div className="spinner-border text-dark" style={{ width: "3rem", height: "3rem" }} role="status">
        <span className="sr-only"></span>
      </div>
    </div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>

      <div className="py-5  px-md-0 px-3 bg-light">
        <div className="container my-5">
          <div className="d-flex justify-content-center row">
            <div className="col-lg-11 bg-secondary">
              {blog && (

                <div className="row p-3 bg-white">
                  <div className='mb-3'>
                    <span className='p-16 text-secondary me-5'>
                      Posted on October 6th 2021
                    </span>
                    <span>
                      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.8698 6.962C20.3438 7.582 20.3438 8.419 19.8698 9.038C18.3768 10.987 14.7948 15 10.6128 15C6.4308 15 2.8488 10.987 1.3558 9.038C1.12519 8.74113 1 8.37592 1 8C1 7.62408 1.12519 7.25887 1.3558 6.962C2.8488 5.013 6.4308 1 10.6128 1C14.7948 1 18.3768 5.013 19.8698 6.962V6.962Z" stroke="#B8B8B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.6133 11C12.2701 11 13.6133 9.65685 13.6133 8C13.6133 6.34315 12.2701 5 10.6133 5C8.95643 5 7.61328 6.34315 7.61328 8C7.61328 9.65685 8.95643 11 10.6133 11Z" stroke="#B8B8B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>

                    <span className='p-16 text-secondary ms-2 '>
                      {blogView?.filter(e => e?.id === id)[0]?.views || 0} views
                    </span>
                  </div>
                  <h3 className='mb-5'>{blog?.Title}</h3>
                  <img alt='' className="img-fluid img-responsive product-image mb-5"
                    src={blog?.Image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/download.webp";
                    }} />
                  <h4 className='mb-5'>{blog?.Subtitle}</h4>
                  <p className=" mb-0 p-16 text-secondary">{blog?.Article}<br /><br />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer py-5 px-md-0 px-3 ">
        <div className="container my-5">
          <div className="d-flex justify-content-center row">
            <div className="col-lg-11 px-0">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="widget mb-3">
                    <h3 className="text-capitalize mb-5">Get in touch with us for your service</h3>
                    <svg width="167" height="24" viewBox="0 0 167 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_545_697)">
                        <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="white" />
                      </g>
                      <g clipPath="url(#clip1_545_697)">
                        <path d="M55.2162 21.75C64.2705 21.75 69.2243 14.2467 69.2243 7.74186C69.2243 7.53092 69.2196 7.3153 69.2102 7.10436C70.1739 6.40746 71.0055 5.54425 71.666 4.5553C70.7685 4.9546 69.8157 5.21538 68.8399 5.32874C69.8673 4.71291 70.6365 3.74547 71.0051 2.60577C70.0386 3.17856 68.9816 3.58261 67.8795 3.80061C67.1369 3.01156 66.155 2.48912 65.0857 2.31405C64.0164 2.13899 62.9192 2.32105 61.9638 2.8321C61.0083 3.34314 60.2478 4.15471 59.7999 5.14131C59.3519 6.12792 59.2414 7.23462 59.4855 8.2903C57.5285 8.19209 55.614 7.6837 53.866 6.7981C52.118 5.91249 50.5757 4.66944 49.339 3.14952C48.7104 4.23324 48.5181 5.51565 48.801 6.73609C49.084 7.95654 49.8211 9.02345 50.8624 9.71999C50.0806 9.69517 49.316 9.48468 48.6316 9.10592V9.16686C48.6309 10.3041 49.0241 11.4066 49.7443 12.2868C50.4645 13.167 51.4673 13.7706 52.5823 13.995C51.8581 14.1931 51.098 14.222 50.3609 14.0794C50.6755 15.0574 51.2876 15.9129 52.1118 16.5263C52.936 17.1398 53.9311 17.4806 54.9584 17.5012C53.2144 18.8711 51.0602 19.6141 48.8426 19.6106C48.4493 19.61 48.0564 19.5859 47.666 19.5384C49.9189 20.9837 52.5395 21.7514 55.2162 21.75Z" fill="white" />
                      </g>
                      <g clipPath="url(#clip2_545_697)">
                        <path d="M107.334 2.16094C110.54 2.16094 110.92 2.175 112.181 2.23125C113.353 2.28281 113.986 2.47969 114.407 2.64375C114.965 2.85938 115.368 3.12188 115.786 3.53906C116.207 3.96094 116.465 4.35938 116.681 4.91719C116.845 5.33906 117.042 5.97656 117.093 7.14375C117.15 8.40937 117.164 8.78906 117.164 11.9906C117.164 15.1969 117.15 15.5766 117.093 16.8375C117.042 18.0094 116.845 18.6422 116.681 19.0641C116.465 19.6219 116.203 20.025 115.786 20.4422C115.364 20.8641 114.965 21.1219 114.407 21.3375C113.986 21.5016 113.348 21.6984 112.181 21.75C110.915 21.8062 110.536 21.8203 107.334 21.8203C104.128 21.8203 103.748 21.8062 102.487 21.75C101.315 21.6984 100.682 21.5016 100.261 21.3375C99.7027 21.1219 99.2996 20.8594 98.8824 20.4422C98.4605 20.0203 98.2027 19.6219 97.9871 19.0641C97.823 18.6422 97.6262 18.0047 97.5746 16.8375C97.5184 15.5719 97.5043 15.1922 97.5043 11.9906C97.5043 8.78438 97.5184 8.40469 97.5746 7.14375C97.6262 5.97187 97.823 5.33906 97.9871 4.91719C98.2027 4.35938 98.4652 3.95625 98.8824 3.53906C99.3043 3.11719 99.7027 2.85938 100.261 2.64375C100.682 2.47969 101.32 2.28281 102.487 2.23125C103.748 2.175 104.128 2.16094 107.334 2.16094ZM107.334 0C104.076 0 103.668 0.0140625 102.389 0.0703125C101.114 0.126563 100.237 0.332812 99.4777 0.628125C98.6855 0.9375 98.0152 1.34531 97.3496 2.01562C96.6793 2.68125 96.2715 3.35156 95.9621 4.13906C95.6668 4.90313 95.4605 5.775 95.4043 7.05C95.348 8.33437 95.334 8.74219 95.334 12C95.334 15.2578 95.348 15.6656 95.4043 16.9453C95.4605 18.2203 95.6668 19.0969 95.9621 19.8563C96.2715 20.6484 96.6793 21.3188 97.3496 21.9844C98.0152 22.65 98.6855 23.0625 99.473 23.3672C100.237 23.6625 101.109 23.8687 102.384 23.925C103.664 23.9812 104.071 23.9953 107.329 23.9953C110.587 23.9953 110.995 23.9812 112.275 23.925C113.55 23.8687 114.426 23.6625 115.186 23.3672C115.973 23.0625 116.643 22.65 117.309 21.9844C117.975 21.3188 118.387 20.6484 118.692 19.8609C118.987 19.0969 119.193 18.225 119.25 16.95C119.306 15.6703 119.32 15.2625 119.32 12.0047C119.32 8.74688 119.306 8.33906 119.25 7.05938C119.193 5.78438 118.987 4.90781 118.692 4.14844C118.396 3.35156 117.989 2.68125 117.318 2.01562C116.653 1.35 115.982 0.9375 115.195 0.632812C114.431 0.3375 113.559 0.13125 112.284 0.075C111 0.0140625 110.592 0 107.334 0Z" fill="white" />
                        <path d="M107.334 5.83594C103.931 5.83594 101.17 8.59688 101.17 12C101.17 15.4031 103.931 18.1641 107.334 18.1641C110.737 18.1641 113.498 15.4031 113.498 12C113.498 8.59688 110.737 5.83594 107.334 5.83594ZM107.334 15.9984C105.126 15.9984 103.336 14.2078 103.336 12C103.336 9.79219 105.126 8.00156 107.334 8.00156C109.542 8.00156 111.332 9.79219 111.332 12C111.332 14.2078 109.542 15.9984 107.334 15.9984Z" fill="white" />
                        <path d="M115.181 5.59214C115.181 6.38902 114.534 7.0312 113.742 7.0312C112.945 7.0312 112.303 6.38433 112.303 5.59214C112.303 4.79526 112.95 4.15308 113.742 4.15308C114.534 4.15308 115.181 4.79995 115.181 5.59214Z" fill="white" />
                      </g>
                      <g clipPath="url(#clip3_545_697)">
                        <path d="M165.223 0H144.772C143.792 0 143 0.773438 143 1.72969V22.2656C143 23.2219 143.792 24 144.772 24H165.223C166.203 24 167 23.2219 167 22.2703V1.72969C167 0.773438 166.203 0 165.223 0ZM150.12 20.4516H146.558V8.99531H150.12V20.4516ZM148.339 7.43438C147.195 7.43438 146.272 6.51094 146.272 5.37187C146.272 4.23281 147.195 3.30937 148.339 3.30937C149.478 3.30937 150.402 4.23281 150.402 5.37187C150.402 6.50625 149.478 7.43438 148.339 7.43438ZM163.452 20.4516H159.894V14.8828C159.894 13.5562 159.87 11.8453 158.042 11.8453C156.191 11.8453 155.909 13.2937 155.909 14.7891V20.4516H152.356V8.99531H155.769V10.5609H155.816C156.289 9.66094 157.452 8.70938 159.181 8.70938C162.786 8.70938 163.452 11.0813 163.452 14.1656V20.4516Z" fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_545_697">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                        <clipPath id="clip1_545_697">
                          <rect width="24" height="24" fill="white" transform="translate(47.666)" />
                        </clipPath>
                        <clipPath id="clip2_545_697">
                          <rect width="24" height="24" fill="white" transform="translate(95.334)" />
                        </clipPath>
                        <clipPath id="clip3_545_697">
                          <rect width="24" height="24" fill="white" transform="translate(143)" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="widget">
                    <p className='mb-1 p-18 text-secondary'>Help line Number</p>
                    <h6 className='fs-24 mb-4'>1800 265 24 52</h6>
                  </div>
                  <div className="widget">
                    <p className='mb-1 p-18 text-secondary'>Address</p>
                    <h6 className='fs-24 mb-4'>NH 234 Public Square San Francisco 65368</h6>
                  </div>
                  <div className="widget">
                    <p className='mb-1 p-18 text-secondary'>We are open</p>
                    <h6 className='fs-24 mb-4'>Monday to Friday 9:00 AM to  10:00  AM</h6>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
