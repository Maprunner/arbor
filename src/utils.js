const lookup = [
  {name: "British Long", abbr: "BOC"},
  {name: "British Middle", abbr: "BMC"},
  {name: "British Sprint", abbr: "BSC"},
  {name: "British Night", abbr: "BNC"},
  {name: "JK Sprint", abbr: "JK Sprint"},
  {name: "JK Day 1", abbr: "JK Day 1"},
  {name: "JK Day 2", abbr: "JK Day 2"}
];
  
export const getEventAbbreviation = (eventDetails) => {
  // creates document title for a given event
  // eventDetails, if it exists, is an array of one entry containig an object of event details
  // which is what is needed by AG-Grid.
  if (eventDetails.length > 0) {
    const idx = lookup.findIndex( function (element){
      return element.name === eventDetails[0].Event;
    });
    return (idx > -1) ? lookup[idx].abbr + " " + eventDetails[0].Year: null;
  } else {
    return null;
  }
}

// formats a URL as a link for display if it exists
// params is the AG-Grid row info sent to a Cell Renderer
export const formatLink = (params) => {
  return ((params.data.Link === "") || (params.data.Link === null)) ? "":
    "<a href='" + params.data.Link + "' target='_blank'>Map</a>";
}

// formats a position for display in AG-Grid
export const formatPosition = (params) => {
  return parseInt(params.value, 10) === 999 ? "-" : params.value;
}
