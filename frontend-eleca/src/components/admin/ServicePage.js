import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// Components
import Header from "../partials/admin/AdminHeader";
import AdminSecondaryHeader from "../partials/admin/AdminSecondaryHeader";
import Footer from "../partials/Footer";
import ProcessService from "../partials/admin/ProcessService";

// Process
import Accepted from "../partials/process/Accepted";
import Pending from "../partials/process/Pending";
import Processing from "../partials/process/Processing";
import CancelledOrRejected from "../partials/process/CancelledOrRejected";
import Completed from "../partials/process/Completed";
import Delivered from "../partials/process/Delivered";

// User Context
import UserContext from "../../context/UserContext";
import AdminContext from "../../context/AdminContext";

// Back To Top
import BackToTop from '../partials/BackToTop'
import DonwloadImage from '../partials/tiny/DonwloadImage'
import Loader from '../partials/tiny/Loader'



export default function ServicePage() {
  const { Host } = useContext(UserContext);
  const AdminContextData = useContext(AdminContext)

  const Route = useNavigate()

  // Services
  const [serviceDetails, setServiceDetails] = useState([]);
  const [serviceProcess, setServiceProcess] = useState([]);

  // Loader
  const [loader, setLoader] = useState(true)
  
  // Issues Ref
  const [issues, setIssues] = useState([]);
  
  const { id } = useParams();
  const [status, setStatus] = useState("");

  const scaleLarge = (e) => {
    e.target.classList.toggle("w-full");
  };
  
  // Update Total Amount
  const totalAmtRef = useRef(null)
  const [totalAmt, setTotalAmt] = useState('')

  const updateAmt = () => {
    if(totalAmtRef.current.value < 1) {
      totalAmtRef.current.classList.add('border-red-500')
    } else {
      totalAmtRef.current.classList.remove('border-red-500')
      
      // Update Total Amount
      fetch(Host + "admin/update-total-amount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: AdminContextData.AuthToken
        },
        body: JSON.stringify({
          id, totalAmt: totalAmtRef.current.value
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.data) {
          setTotalAmt(totalAmtRef.current.value)
          totalAmtRef.current.value = ''

          window.alert(data.msg)
        } else {
          console.log(data)
        }
      })
    }
  }

    // Update Total Amount
  const advanceAmtRef = useRef(null)
  const [advanceAmt, setAdvanceAmt] = useState('')
  
  const updateAdvanceAmt = () => {
    if(advanceAmtRef.current.value < 1) {
      advanceAmtRef.current.classList.add('border-red-500')
    } else {
      advanceAmtRef.current.classList.remove('border-red-500')
      
      // Update Total Amount
      fetch(Host + "admin/update-advance-amount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: AdminContextData.AuthToken
        },
        body: JSON.stringify({
          id, advanceAmt: advanceAmtRef.current.value
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.data) {
          setAdvanceAmt(advanceAmtRef.current.value)
          advanceAmtRef.current.value = ''

          window.alert(data.msg)
        } else {
          console.log(data)
        }
      })
    }
  }


  const scrollBottom = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    var auth = AdminContextData.Authorize()
    if(!auth) return Route('/login')

    fetch(Host + "service-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sid: id }),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.data[0].length < 1) {
        window.alert('Wrong Service ID or Service request deleted...')
        window.history.back()
        return
      }
      
      setStatus(data.data[1][data.data[1].length - 1].status);
      setIssues(data.data[0].issues.split(","));
      setTotalAmt(data.data[0].totalAmt)
      setAdvanceAmt(data.data[0].advanceAmt)
      setServiceDetails(data.data[0]);
      setServiceProcess(data.data[1]);
      setLoader(false)
    });

    document.title = "Service Details | Eleca";

    window.scrollTo({
      top: 0
    });
  }, []);

  return (
    loader ? 
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader/> 
        <div className="text-lg font-medium text-gray-400">
          Loading...
        </div>
      </div>
    :
    <>
      {/* Header */}
      <Header />

      <div className="divider mb-5"></div>

      <div className="py-5 px-4 mb-3 bg-gray-900 rounded-lg">
        <AdminSecondaryHeader />
      </div>

      {/* Main */}
      <main className="relative">
        <section className="py-5 body-font">
          <h1 className="title-font text-2xl font-medium text-gray-300">
            {serviceDetails.itemName}
          </h1>
          <div className="flex items-center mb-2 max-[400px]:flex-col max-[400px]:items-start">
            <h2 className="text-gray-400 mt-1">
              Request Id : {serviceDetails.ID}
            </h2>
            <span className="text-teal-500 mx-3 max-[400px]:hidden">|</span>
            <p className="text-gray-400">{serviceDetails.currentStatus}</p>

            {status !== "Delivered" && (
              <button
                onClick={scrollBottom}
                className="ml-4 flex items-center text-yellow-400 hover:text-yellow-500 transition-all"
              >
                <i className="fa-regular fa-pen-to-square mr-2 text-sm"></i>
                Process
              </button>
            )}
          </div>
          <div style={{ padding: "2px" }}>
            {serviceDetails.image &&
              <div
                className="image-box relative w-full rounded transition-all cursor-pointer"
                style={{"--src": "url("+ Host +"static/images/" + serviceDetails.image + ")"}}
              >
                <DonwloadImage imgUrl={Host + "static/images/" + serviceDetails.image} imgName={serviceDetails.image}/>
              </div>
            }
          </div>
        </section>

        <section className="bg-gray-900 rounded-lg mt-1 mb-5 p-5 text-gray-400 body-font">
          <div className="mb-3">
            <h2 className="text-teal-500 font-bold">Customer</h2>
            <div className="ml-4 mt-2">
              <ul>
                <li className="my-1">
                  <span>Name : </span>
                  <span className="capitalize">{serviceDetails.cName}</span>
                </li>
                <li className="my-1">
                  <span>Address : </span>
                  <span className="capitalize">{serviceDetails.cAddress}</span>
                </li>
                <li className="my-1">
                  <span>Mobile : </span>
                  <Link to={`tel:${serviceDetails.cMobile}`} className="hover:text-teal-500 transition-all">
                    {serviceDetails.cMobile}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-3">
            <h2 className="text-teal-500 font-bold">Issues</h2>
            <div className="ml-4 mt-2">
              <ul className="ml-4">
                {issues.map((i) => <li key={i} className="my-1 list-disc capitalize">{i.trim()}</li>)}
              </ul>
            </div>
          </div>
          <div className="">
            <h2 className="text-teal-500 font-bold">Payment</h2>
            <div className="ml-4 mt-2">
              <ul className="ml-4">
                <li className="my-1 list-disc text-gray-500">
                  <span>Estimate Amount : </span>
                  <span>{serviceDetails.estAmt}</span>
                </li>
                <li className="my-1 list-disc text-gray-500">
                  <span>Due Amount : </span>
                  {totalAmt - advanceAmt < 1 ?
                    <span className="font-medium">{advanceAmt - totalAmt}</span>
                  : <span className="text-red-500 font-medium">{totalAmt - advanceAmt}</span>
                  }
                </li>
                <li className="my-2 list-disc">
                  <span>Advance Amount : </span>
                  <span className="font-medium text-teal-500">
                    {advanceAmt}
                  </span>

                  <input type="number" ref={advanceAmtRef} placeholder="00" className="w-12 px-2 mx-3 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" />
                  <button onClick={updateAdvanceAmt} className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-0.5 px-2 focus:outline-none hover:bg-yellow-600 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
                    Update
                  </button>
                </li>
                <li className="my-4 list-disc">
                  <span>Total Amount : </span>
                  <span className="font-medium text-teal-500">
                    {totalAmt}
                  </span>

                  <input type="number" ref={totalAmtRef} placeholder="00" className="w-12 px-2 mx-3 text-sm bg-transparent border border-gray-200 text-gray-200 outline-none focus:border-teal-500 rounded transition-all" />
                  <button onClick={updateAmt} className="inline-flex text-sm font-medium items-center bg-gray-800 border-0 py-0.5 px-2 focus:outline-none hover:bg-yellow-600 transition-all hover:text-gray-800 text-gray-300 rounded md:mt-0">
                    Update
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 rounded-lg py-2 text-gray-200 body-font">
          <div className="container p-5 mx-auto flex flex-wrap">
            <div className="flex flex-wrap w-full">
              <div className="w-full md:pr-10 md:py-6">
                {serviceProcess.map((process) => {
                  if (process.status === "Accepted") {
                    return <Accepted key={process.ID} adminName={serviceDetails.adminName} values={process} />;
                  }
                  if (process.status === "Pending") {
                    return (
                      <Pending
                        key={process.ID}
                        Host={Host}
                        values={process}
                        scaleLarge={scaleLarge}
                      />
                    );
                  }
                  if (process.status === "Processing") {
                    return (
                      <Processing
                        key={process.ID}
                        Host={Host}
                        values={process}
                        scaleLarge={scaleLarge}
                      />
                    );
                  }
                  if (
                    process.status === "Cancelled" ||
                    process.status === "Rejected"
                  ) {
                    return (
                      <CancelledOrRejected
                        key={process.ID}
                        Host={Host}
                        values={process}
                        scaleLarge={scaleLarge}
                      />
                    );
                  }
                  if (process.status === "Completed") {
                    return (
                      <Completed
                        key={process.ID}
                        Host={Host}
                        values={process}
                        scaleLarge={scaleLarge}
                      />
                    );
                  }
                  if (process.status === "Delivered") {
                    return (
                      <Delivered
                        key={process.ID}
                        Host={Host}
                        values={process}
                        scaleLarge={scaleLarge}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Process Service */}
      {status !== "Delivered" && (
        <div className="p-5 mt-5 rounded-lg bg-gray-900">
          <ProcessService status={status} sid={serviceDetails.ID} Host={Host} />
        </div>
      )}

      {/* Back To Top */}
      <BackToTop />

      {/* Footer */}
      <Footer />
    </>
  );
}
