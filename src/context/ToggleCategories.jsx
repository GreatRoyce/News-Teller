import React, { createContext, useState } from 'react';

// 1️⃣ Create the context object — this will be shared across components
export const ToggleCategories = createContext();

// 2️⃣ Create the Provider component — wraps parts of the app that need access
export const TogPromise = ({ children }) => {
  
  // 3️⃣ useState controls whether categories are visible or not
  const [visible, setVisible] = useState(false);

  return (
    // 4️⃣ Wrap children in the Provider and pass shared state via 'value'
    <ToggleCategories.Provider value={{ visible, setVisible }}>
      {children} {/* 5️⃣ All child components inside here can now use `useContext(ToggleCategories)` */}
    </ToggleCategories.Provider>
  );
};
