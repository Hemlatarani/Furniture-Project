import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CompanyProfile() {
  let apibaseurl = import.meta.env.VITE_APIBASEURL;

  let [companyId, setCompanyId] = useState("");

  let [formData, setformData] = useState({
    Name: "",
    Email: "",
    Mobilenumber: "",
    Address: "",
  });

  let [mapUrl, setmapUrl] = useState("");
  let [youtubeUrl, setyoutubeUrl] = useState("");
  let [facebookUrl, setfacebookUrl] = useState("");
  let [logo, setlogo] = useState(null);
  let [preview, setPreview] = useState("");

  // ✅ GET DATA
  // useEffect(() => {
  //   axios.get(`${apibaseurl}/company/getComdata`)
  //     .then((res) => {
  //       let data = res.data.companydata?.[0];

  //       if (data) {
  //         setCompanyId(data._id);

  //         setformData({
  //           Name: data.Name || "",
  //           Email: data.Email || "",
  //           Mobilenumber: data.Mobilenumber || "",
  //           Address: data.Address || "",
  //         });

  //         setmapUrl(data.MapUrl || "");
  //         setyoutubeUrl(data.Youtube || "");
  //         setfacebookUrl(data.Facebook || "");
  //         setPreview(data.imageLogo || "");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // ✅ HANDLE INPUT
  let handlechange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // ✅ LOGO HANDLE
  let logohandle = (e) => {
    let file = e.target.files[0];
    setlogo(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ CREATE + UPDATE
  let updateData = (e) => {
    e.preventDefault();

    let form = new FormData();

    form.append("Name", formData.Name);
    form.append("Email", formData.Email);
    form.append("Mobilenumber", formData.Mobilenumber);
    form.append("Address", formData.Address);
    form.append("MapUrl", mapUrl);
    form.append("Youtube", youtubeUrl);
    form.append("Facebook", facebookUrl);
    // form.append("imagelogo",imageLogo)

    if (logo) {
      form.append("imageLogo", logo);
    }

    // 🔥 CONDITION
    if (companyId) {
      // ✅ UPDATE
      axios.put(`${apibaseurl}/company/update/${companyId}`, form)
      .then((res) => res.data)
      .then((finalRes) => {
        alert("Updated Successfully ✅");
        getcompanydata();
      
      })
      // console.log("hlo fon",formData)
        .catch((err) => console.log(err));
    } else {
      // ✅ CREATE
      axios.post(`${apibaseurl}/company/save`, form)
        .then((res) => {
          console.log(res.data)
          alert("Created Successfully ✅");

          // 👉 ID set after create
          setCompanyId(res.data.data._id);
          console.log(res.data.data._id)
        })
        .catch((err) => console.log(err));
    }

  };
  //get data 
  let getcompanydata = async () => {
    axios.get(`${apibaseurl}/company/getComdata`)
      .then((res) => res.data)
      .then((finalRes) => {
        let data = finalRes.companydata?.[0];
        if (data) {
          setCompanyId(data._id);

          setformData({
            Name: data.Name || "",
            Email: data.Email || "",
            Mobilenumber: data.Mobilenumber || "",
            Address: data.Address || "",

          });
          setmapUrl(data.MapUrl || "");
          setyoutubeUrl(data.Youtube || "");
          setfacebookUrl(data.Facebook || "");
          setPreview(data.imageLogo || "");
      }
        // console.log(finalRes.companydata)
        })
        .catch((err)=>
          console.log(err))
      
  }

  useEffect(() => {
    getcompanydata()
  }, [])
  // ✅ YOUTUBE ID
  const getYoutubeId = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.split("watch?v=")[1].split("&")[0];
    }

    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].split("?")[0];
    }

    return "";
  };

  return (
    <form onSubmit={updateData}>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-semibold mb-4">Company Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LOGO */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Logo
              </label>

              <div
                onClick={() => document.getElementById("logoInput").click()}
                className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="logo"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-3xl">☁️</div>
                    <p>Click to upload</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                id="logoInput"
                className="hidden"
                onChange={logohandle}
              />
            </div>

            {/* RIGHT */}
            <div className="md:col-span-2 space-y-4">

              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handlechange}
                placeholder="Company Name"
                className="w-full border px-4 py-2"
              />

              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handlechange}
                placeholder="Email"
                className="w-full border px-4 py-2"
              />

              <input
                type="number"
                name="Mobilenumber"
                value={formData.Mobilenumber}
                onChange={handlechange}
                placeholder="Mobile"
                className="w-full border px-4 py-2"
              />

            </div>
          </div>

          {/* ADDRESS */}
          <textarea
            name="Address"
            value={formData.Address}
            onChange={handlechange}
            placeholder="Address"
            className="w-full border px-4 py-2 mt-4"
          />

          {/* MAP */}
          <input
            type="text"
            placeholder="Google Map URL"
            value={mapUrl}
            onChange={(e) => setmapUrl(e.target.value)}
            className="w-full border px-4 py-2 mt-4"
          />

          {mapUrl && (
            <iframe
              src={`https://www.google.com/maps?q=${mapUrl}&output=embed`}
              width="100%"
              height="300"
            ></iframe>
          )}

          {/* SOCIAL */}
          <div className="grid grid-cols-2 gap-4 mt-6">

            <div>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setyoutubeUrl(e.target.value)}
                className="w-full border px-4 py-2"
              />

              {youtubeUrl && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(youtubeUrl)}`}
                  width="100%"
                  height="200"
                ></iframe>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Facebook URL"
                value={facebookUrl}
                onChange={(e) => setfacebookUrl(e.target.value)}
                className="w-full border px-4 py-2"
              />

              {facebookUrl && (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${facebookUrl}`}
                  width="100%"
                  height="200"
                ></iframe>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 mt-6"
          >
            {companyId ? "Update Company Profile" : "Create Company Profile"}
          </button>

        </div>
      </div>
    </form>
  );
}