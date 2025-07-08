export default [
   
    {
        key:"Everything",
        filterFn:(q) => true
    },
    {
        key:"Priority",
        filterFn:(q) => q.friendly_name.toLowerCase().includes("priority")
    },
    {
        key:"Voice",
        filterFn: (q) =>  ["Casago Support - Voice","GE: BPO - TOG - Spanish - P3","GE: ESP","GE: Main - P3","GE: Main - RS - P3","GE: P1 - Voice","GE: P2 - Voice","GE: P3 - Voice","GE: Relocation Services","GE: Relocation Services - ABB","GOTVG: Internal Use Only","Group Sales","Tour & Travel"].includes(q.friendly_name)
    },
    {
        key:"SMS",
        filterFn:(q) =>  ["GE: P2 - SMS","GE: P3 - SMS","GE: Relo - SMS","GE: Relo - SMS - Outbound","GE: Relo - SMS Priority","GE: Relo ABB - SMS","GE: Relocation Services - ABB SMS - Outbound","GE: Webchat - Trip Portal"].includes(q.friendly_name)
    },
    {
        key:"Email",
        filterFn:(q) =>  ["Email: Airbnb - $ Request","Email: Airbnb - $ Request Follow-up","Email: Airbnb - Alteration","Email: Airbnb - Alteration Follow-up","Email: Airbnb - DE","Email: Airbnb - DE Follow-up","Email: Airbnb - Priority Alteration","Email: Airbnb - Voicemail","Email: Airbnb Registrations/TRs","Email: BDC - Canada","Email: BDC - Cancellation Needed","Email: BDC - Date Alterations","Email: BDC - Follow-up","Email: BDC - General","Email: BDC - Modifications","Email: BDC - Priority","Email: BDC - SOD","Email: Noise Alerts - Daytime Priority","Email: Noise Alerts - Nighttime Priority","Email: Relo Priority","Email: Relo Standard"].includes(q.friendly_name)
    },
    {
        key:"Airbnb",
        filterFn:(q) => q.friendly_name.toLowerCase().includes("airbnb") && !( ["Airbnb: Inquiries - System Completed","Airbnb: Latam GS Follow-up","Airbnb: Not Live","Email: Airbnb Reviews","Email: Airbnb Reviews - Apologies"].includes(q.friendly_name))
    },
    {
        key:"BDC",
        filterFn:(q) =>["BDC: Arrival","BDC: Canada","BDC: Canada/US Follow-up","BDC: Future Bookings","BDC: Latam","BDC: Overflow","BDC: Priority","BDC: Regulated","BDC: Regulated Follow-up","Email: BDC - Canada","Email: BDC - Cancellation Needed","Email: BDC - Date Alterations","Email: BDC - Follow-up","Email: BDC - General","Email: BDC - Modifications","Email: BDC - Priority","Email: BDC - SOD"].includes(q.friendly_name)
    },
    {
        key:"Relo",
        filterFn:(q) =>["Airbnb: Relocations","Email: Relo Priority","Email: Relo Standard","GE: Relo - SMS","GE: Relo - SMS - Outbound","GE: Relo - SMS Priority","GE: Relo ABB - SMS","GE: Relocation Services","GE: Relocation Services - ABB","GE: Relocation Services - ABB Outbound Only","GE: Relocation Services Outbound Only","Relo: Internal Use Only"].includes(q.friendly_name)
    },
    {
        key:"ROS",
        filterFn:(q) => q.friendly_name.substring(0, "ROS".length) == "ROS"
    }

]


