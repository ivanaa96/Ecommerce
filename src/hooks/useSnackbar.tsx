import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum SnackbarSeverity {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
}

interface ISnackbar {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

interface SnackbarContextProps {
  snackbar: ISnackbar;
  openSnackbar: (message: string, severity?: SnackbarSeverity) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error();
  }

  return context;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: '',
    severity: SnackbarSeverity.INFO,
  });

  const openSnackbar = (
    message: string,
    severity: SnackbarSeverity = SnackbarSeverity.INFO
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        openSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}
