/* SOC122 recording registry.
   Add an entry only after the recording or instructor update is ready for students.
   Supported platforms: youtube and zoom. Never place meeting passcodes or private credentials here.
   Example:
   "2": {
     kind: "class",
     platform: "zoom",
     url: "https://senecapolytechnic.zoom.us/rec/share/RECORDING_LINK",
     title: "Week 2 class recording",
     date: "2026-09-18",
     access: "Captions and transcript available on Zoom",
     transcriptUrl: ""
   }
*/
window.SOC122_RECORDINGS = {};
