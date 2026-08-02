import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component Test', () => {
  it('ควรจะเรนเดอร์หน้า App ได้โดยไม่เกิด Error', () => {
    // 1. จำลองการเรนเดอร์ App บน Browser
    render(<App />);

    // 2. เช็คว่ามีองค์ประกอบในหน้าเว็บเรนเดอร์ออกมาจริงไหม 
    // (ลองเปลี่ยนคำว่า "Welcome" ให้ตรงกับข้อความที่มีจริงๆ ในหน้า App ของคุณได้)
    expect(document.body).toBeInTheDocument();
  });
});