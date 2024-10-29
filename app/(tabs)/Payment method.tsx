import React, { useEffect, useState } from 'react';
import { getData,postData } from '@/api/api';

const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [momoPhone, setMomoPhone] = useState('');
  const [zaloPhone, setZaloPhone] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    // Kiểm tra xem có chạy trên trình duyệt không
    if (typeof document !== 'undefined') {
      console.log('Component mounted in browser');
    }
  }, []);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handleSubmit = () => {
    // Xử lý thanh toán
    alert(`Đã chọn phương thức: ${selectedPayment}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Chọn phương thức thanh toán</h2>
      <div>
        <input
          type="radio"
          id="cash"
          name="payment"
          value="cash"
          onChange={handlePaymentChange}
        />
        <label htmlFor="cash">Tiền mặt</label>
      </div>
      <div>
        <input
          type="radio"
          id="momo"
          name="payment"
          value="momo"
          onChange={handlePaymentChange}
        />
        <label htmlFor="momo">Momo</label>
        {selectedPayment === 'momo' && (
          <input
            type="text"
            placeholder="Nhập số điện thoại Momo"
            value={momoPhone}
            onChange={(e) => setMomoPhone(e.target.value)}
          />
        )}
      </div>
      <div>
        <input
          type="radio"
          id="zalopay"
          name="payment"
          value="zalopay"
          onChange={handlePaymentChange}
        />
        <label htmlFor="zalopay">Zalo Pay</label>
        {selectedPayment === 'zalopay' && (
          <input
            type="text"
            placeholder="Nhập số điện thoại Zalo"
            value={zaloPhone}
            onChange={(e) => setZaloPhone(e.target.value)}
          />
        )}
      </div>
      <div>
        <input
          type="radio"
          id="bank"
          name="payment"
          value="bank"
          onChange={handlePaymentChange}
        />
        <label htmlFor="bank">Ngân hàng</label>
        {selectedPayment === 'bank' && (
          <>
            <select>
              <option value="">Chọn ngân hàng</option>
              <option value="vietcombank">Vietcombank</option>
              <option value="techcombank">Techcombank</option>
              <option value="vietinbank">Vietinbank</option>
            </select>
            <input
              type="text"
              placeholder="Nhập số tài khoản"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
            />
          </>
        )}
      </div>
      <h3>
        Tổng số tiền: <span>100000</span> VNĐ
      </h3>
      <label>
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
        Tôi đồng ý với điều khoản và điều kiện.
      </label>
      <button onClick={handleSubmit} disabled={!isAgreed}>
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default PaymentMethod;
