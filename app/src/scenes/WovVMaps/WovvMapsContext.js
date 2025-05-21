import React, {useState} from 'react';

export const useMapContext = () => {
  const [mapsData, setMapsData] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [directionData, setdirectionData] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [isAvoidtrairAndEscalator, setIsAvoidtrairAndEscalator] =
    useState(false);
  const [floorIndex, setfloorIndex] = useState(0);
  const [floorArray, setfloorArray] = useState([]);
  const [isClicked, setisClicked] = useState(false);

  return {
    mapsData,
    setMapsData,
    socketId,
    setSocketId,
    destination,
    setDestination,
    departure,
    setDeparture,
    currentFloor,
    setCurrentFloor,
    directionData,
    setdirectionData,
    showDetailCard,
    setShowDetailCard,
    isAvoidtrairAndEscalator,
    setIsAvoidtrairAndEscalator,
    floorIndex,
    setfloorIndex,
    floorArray,
    setfloorArray,
    isClicked,
    setisClicked,
  };
};

export const WovVMapsContext = React.createContext();

export const WovVMapsProvider = (props) => {
  const mapContextController = useMapContext();
  return (
    <WovVMapsContext.Provider value={mapContextController}>
      {props.children}
    </WovVMapsContext.Provider>
  );
};
