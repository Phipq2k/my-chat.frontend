import { useEffect, useState } from "react";
import ToastType from "../constants/toast-type";
function Toast({ type = ToastType.SUCCESS, toast }) {
  const [showToast, setShowToast] = useState(false);
  const [animationClear, setAnimationClear] = useState(true);

  const handleCloseToast = () => {
    setShowToast(false);
    setTimeout(() => {
      setAnimationClear(false);
    }, 500);
  };

  useEffect(() => {
    setShowToast(false);
    setTimeout(() => {
      setAnimationClear(true);
    });
    if (toast.show) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setTimeout(() => {
        setAnimationClear(false);
      }, 3500);
    }
  }, [toast]);

  const showToastEffect = (toastEffect) => {
    if (showToast) {
      toastEffect = "slideShow";
    } else {
      toastEffect = "slideHide";
    }
    return toastEffect;
  };

  const clearToastEffect = (clear) => {
    if (!animationClear) {
      clear = "hide";
    }
    return clear;
  };

  useEffect(() => {
    let toastEffect = "";
    let clear = "";
    showToastEffect(toastEffect);
    clearToastEffect(clear);
  }, [showToast]);

  return (
    <div
      className={`toastContainer ${clearToastEffect()} ${showToastEffect()}`}
    >
      <div className={`${type} toastItem`}>
        <p>{toast.message}</p>
        <button className="closeToast" onClick={handleCloseToast} title="Đóng" aria-hidden="false">
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toast;
