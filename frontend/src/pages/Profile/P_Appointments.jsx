import React, { useState, useEffect } from "react";
import { useBookedAppos } from "../../context/BookedApposProvider";
import { Button, Card, CardContent, Checkbox, Typography, Avatar, Box, Divider } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../../utils/loadRazorpay";
import { toast } from "react-toastify";

export default function P_Appointments() {
  const { bookedAppos, setBookedAppos, draftedAppos, setDraftedAppos } = useBookedAppos();
  const [agreed, setAgreed] = useState({});
  const [loading, setLoading] = useState(false);

  const [timers, setTimers] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      [...bookedAppos, ...draftedAppos].forEach(app => {
        const appointmentDateTime = new Date(`${app.appointmentDate} ${app.appointmentTime}`);
        const now = new Date();
        const diff = appointmentDateTime - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimers[app._id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimers[app._id] = "Started or Passed";
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookedAppos, draftedAppos]);

  useEffect(() => {
    const getBookedAppointments = async () => {
      try {
        const res = await axios.post("http://localhost:4001/appointment/get_appointments")
        // console.log(res.data?.bookedAppointments)
        setBookedAppos(res.data?.bookedAppointments)
        setDraftedAppos(res.data?.draftedAppointments)
      } catch (error) {
        console.log(error)
      }
    }
    getBookedAppointments();
  }, [])

  const handleCancelDraft = (id) => {
    const updatedDrafts = draftedAppos.filter((app) => app._id !== id);
    setDraftedAppos(updatedDrafts);
  };

  const handleCancelApproved = (id) => {
    const updatedApproved = bookedAppos.filter((app) => app._id !== id);
    setBookedAppos(updatedApproved);
  };

  const handlePayment = (app) => {
    console.log(app);
    navigate(`/p/doctors/${app.doctor._id}/appointments/${app._id}/payment`,
      { state: { appointment: app }}
    )
  }

  // const handlePayment = async () => {
  //   setLoading(true);
  //   const scriptLoaded = await loadRazorpayScript();

  //   if (!scriptLoaded) {
  //     toast.error("Please check your connection");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const { data } = await axios.post("http://localhost:4001/appointment/payment", {
  //       ticketPrice,
  //       appointment,
  //     });

  //     const { order } = data;

  //     const options = {
  //       key: "rzp_test_CTLwMMrrR6wsR5",
  //       amount: order.amount,
  //       currency: "INR",
  //       name: "Mediserve pvt.ltd",
  //       description: "Test Transaction",
  //       order_id: order.id,
  //       handler: async function (response) {
  //         alert("Payment successful");
  //         try {
  //           const { data: receiptData } = await axios.post("http://localhost:4001/appointment/makeReciept", {
  //             response,
  //             appointment,
  //           });

  //           if (receiptData?.updatedAppointment?.isPaid) {
  //             setPaidAppointment(receiptData.updatedAppointment);
  //             navigate("/p/appointments");
  //           }
  //         } catch (error) {
  //           console.error("Error creating receipt:", error);
  //         }
  //       },
  //       prefill: {
  //         name: authUser.fullName,
  //         email: authUser.email,
  //         contact: authUser.phone,
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const razorpayInstance = new window.Razorpay(options);
  //     razorpayInstance.open();
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     toast.error("Payment failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleViewReceipt = (receiptId) => {
    alert("View Receipt: " + receiptId);
  };

  const renderAppointmentCard = (app, isDraft = false) => (
    <Card key={app._id} sx={{ backgroundColor: "#1e293b", color: "white", mb: 3, boxShadow: 5, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#fbbf24", mb: 1 }}>
          Appointment on {app.appointmentDate} at {app.appointmentTime}
        </Typography>
        <Typography variant="body2" sx={{ color: "#38bdf8", mb: 1 }}>
          Time Left: {timers[app._id] || "Calculating..."}
        </Typography>
        <Divider sx={{ borderColor: "#334155", mb: 2 }} />

        <Box display="flex" gap={2}>
          <Avatar src={app.doctor.photo} alt={app.doctor.name} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h6">{app?.doctor?.name}</Typography>
            <Typography variant="body2">Speciality: {app?.doctor?.speciality}</Typography>
            <Typography variant="body2">Clinic: {app?.doctor?.clinic}</Typography>
            <Typography variant="body2">Total Patients: {app?.doctor?.totalPatients}</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#334155", my: 2 }} />

        <Box>
          <Typography variant="subtitle1">Patient Details</Typography>
          <Typography variant="body2">Name: {app?.patient?.fullName}</Typography>
          <Typography variant="body2">Phone: {app?.patient?.phone}</Typography>
          <Typography variant="body2">Blood Group: {app?.patient?.bloodGroup}</Typography>
        </Box>

        <Divider sx={{ borderColor: "#334155", my: 2 }} />

        <Box>
          <Typography variant="body2">Status: <strong>{app?.status}</strong></Typography>
          <Typography variant="body2">Paid: <strong>{app?.isPaid ? "Yes" : "No"}</strong></Typography>
          <Typography variant="body2">Ticket Price: ₹{app?.ticketPrice}</Typography>
        </Box>

        <Box mt={2} display="flex" gap={2} alignItems="center" flexWrap="wrap">
          {isDraft ? (
            <>
              <Box display="flex" alignItems="center" gap={1}>
                <Checkbox
                  checked={!!agreed[app._id]}
                  onChange={(e) => setAgreed((prev) => ({ ...prev, [app._id]: e.target.checked }))}
                  sx={{ color: "#fbbf24" }}
                />
                <Typography variant="body2">I agree to terms</Typography>
              </Box>
              <Button
                variant="contained"
                disabled={!agreed[app._id]}
                onClick={() => { handlePayment(app) }}
                sx={{ backgroundColor: "#fbbf24", color: "black", '&:hover': { backgroundColor: "#facc15" } }}
              >
                Pay Now
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleCancelDraft(app._id)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => handleViewReceipt(app.paymentReciept)}
                sx={{ backgroundColor: "#fbbf24", color: "black", '&:hover': { backgroundColor: "#facc15" } }}
              >
                View Receipt
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleCancelApproved(app._id)}
              >
                Cancel Appointment
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: "#0f172a", minHeight: "100vh", p: 3, color: "white" }}>
      <Typography variant="h4" sx={{ color: "#fbbf24", mb: 3 }}>My Appointments</Typography>

      <Box>
        <Typography variant="h5" sx={{ color: "#fbbf24", mb: 2 }}>Approved Appointments</Typography>
        {bookedAppos && bookedAppos.length > 0 ? (
          bookedAppos.map((app) => renderAppointmentCard(app))
        ) : (
          <Typography color="gray">No approved appointments found.</Typography>
        )}
      </Box>

      <Box mt={5}>
        <Typography variant="h5" sx={{ color: "#fbbf24", mb: 2 }}>Drafted Appointments</Typography>
        {draftedAppos && draftedAppos.length > 0 ? (
          draftedAppos.map((app) => renderAppointmentCard(app, true))
        ) : (
          <Typography color="gray">No drafted appointments found.</Typography>
        )}
      </Box>
    </Box>
  );
}
