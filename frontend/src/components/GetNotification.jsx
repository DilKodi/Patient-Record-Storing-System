import React, { useEffect } from "react";
import Pusher from "pusher-js";

function GetNotification() {
    useEffect(() => {
        // Request notification permission
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission !== "granted") {
                    console.warn("Notification permission denied.");
                }
            });
        }

        // Initialize Pusher
        const pusher = new Pusher("941f615009e3b4e952a9", {
            cluster: "ap1",
            encrypted: true,
        });

        // Subscribe to the "doctors" channel
        const channel = pusher.subscribe("doctors");

        // Listen for the "patient.updated" event
        channel.bind("patient.updated", (data) => {
            console.log("Notification received:", data);

            // Check for notification permissions and send a notification
            if (Notification.permission === "granted") {
                new Notification(`Patient Updated: ${data.patient.name}`, {
                    body: `Details: ${data.patient.diagnosis}`, // Adjust this based on your data
                });
            } else {
                console.log("Notification permission denied.");
            }
        });

        // Cleanup function to unsubscribe from the channel
        return () => {
            channel.unbind("patient.updated");
            pusher.unsubscribe("doctors");
            pusher.disconnect();
        };
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return null; // This component doesn't render any UI
}

export default GetNotification;
