/* =============================================================================
 * TẦNG LƯU TRỮ — Dữ liệu mẫu (seed) nạp vào bộ lưu trữ lần đầu chạy.
 * Tên bảng / tên cột bám theo docs/du-lieu.md và supabase/migrations/0001_khoi_tao.sql.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});

  LEMS.SEED = {
    departments: [
      { id: 1, dept_code: 'FIT', dept_name: 'Khoa Công nghệ Thông tin' },
      { id: 2, dept_code: 'PHYS', dept_name: 'Khoa Vật lý & Kỹ thuật Hạt nhân' },
      { id: 3, dept_code: 'GENERAL', dept_name: 'Phòng Quản trị Thiết bị & Đào tạo' },
    ],

    users: [
      { id: 1, user_code: 'SV202601', email: 'sv1@lems.local', full_name: 'Nguyễn Văn An', role: 'STUDENT', department_id: 1, class_name: 'KHTN2023', status: 'ACTIVE' },
      { id: 2, user_code: 'GV1001', email: 'gv1@lems.local', full_name: 'TS. Trần Minh Khoa', role: 'TEACHER', department_id: 1, class_name: null, status: 'ACTIVE' },
      { id: 3, user_code: 'QL8001', email: 'ql1@lems.local', full_name: 'Lê Hữu Nghĩa', role: 'LAB_MANAGER', department_id: 3, class_name: null, status: 'ACTIVE' },
      { id: 4, user_code: 'SV202602', email: 'sv2@lems.local', full_name: 'Phạm Thị Bình', role: 'STUDENT', department_id: 2, class_name: 'VLKT2023', status: 'ACTIVE' },
      { id: 5, user_code: 'GV2001', email: 'gv2@lems.local', full_name: 'ThS. Võ Thanh Hà', role: 'TEACHER', department_id: 2, class_name: null, status: 'ACTIVE' },
      { id: 6, user_code: 'SV202603', email: 'sv3@lems.local', full_name: 'Đỗ Quốc Cường', role: 'STUDENT', department_id: 1, class_name: 'KTPM2023', status: 'SUSPENDED' },
    ],

    rooms: [
      { id: 1, room_code: 'LAB-AI-801', room_name: 'Phòng Thí nghiệm Trí tuệ Nhân tạo', room_type: 'AI_LAB', building: 'Tòa E', floor: 8, capacity: 30, is_special_approval_required: true, department_id: 1, current_status: 'AVAILABLE', manager_id: 3 },
      { id: 2, room_code: 'LAB-PHYS-203', room_name: 'Phòng Thí nghiệm Quang học & Điện tử', room_type: 'PHYSICS_LAB', building: 'Tòa B', floor: 2, capacity: 45, is_special_approval_required: false, department_id: 2, current_status: 'AVAILABLE', manager_id: 3 },
      { id: 3, room_code: 'A102', room_name: 'Giảng đường Đa năng A102', room_type: 'LECTURE_ROOM', building: 'Tòa A', floor: 1, capacity: 100, is_special_approval_required: false, department_id: 3, current_status: 'AVAILABLE', manager_id: 3 },
    ],

    categories: [
      { id: 1, cat_code: 'CAT-PHYS-MEASURE', cat_name: 'Thiết bị Đo lường Vật lý', category_type: 'SPECIALIZED_LAB' },
      { id: 2, cat_code: 'CAT-CLASSROOM-TECH', cat_name: 'Tiện ích Giảng đường', category_type: 'CLASSROOM_TECH' },
    ],

    // [TD-10] tong_so = số thiết bị sẵn sàng cho mượn, so_dang_giu = số đang giữ ở CHO_XAC_NHAN / DA_DUYET / DANG_MUON
    equipment_models: [
      { id: 1, category_id: 1, model_code: 'OSCILLO-TEK-200', model_name: 'Máy hiện sóng số TBS2000B', brand: 'Tektronix', tracking_type: 'SERIAL_TRACKED', unit: 'Máy', default_room_id: 2, tong_so: 2, so_dang_giu: 0 },
      { id: 2, category_id: 2, model_code: 'MIC-SHURE-PG58', model_name: 'Micro không dây hai kênh', brand: 'Shure', tracking_type: 'SERIAL_TRACKED', unit: 'Bộ', default_room_id: 3, tong_so: 2, so_dang_giu: 0 },
      { id: 3, category_id: 1, model_code: 'MICRO-OLY-CX23', model_name: 'Kính hiển vi quang học CX23', brand: 'Olympus', tracking_type: 'SERIAL_TRACKED', unit: 'Cái', default_room_id: 2, tong_so: 1, so_dang_giu: 0 },
    ],

    equipment_items: [
      { id: 1, model_id: 1, serial_number: 'SN-TEK-2026-001', asset_barcode: 'QR-PHYS-001', current_room_id: 2, condition_state: 'EXCELLENT', operational_status: 'IN_STOCK' },
      { id: 2, model_id: 1, serial_number: 'SN-TEK-2026-002', asset_barcode: 'QR-PHYS-002', current_room_id: 2, condition_state: 'GOOD', operational_status: 'IN_STOCK' },
      { id: 3, model_id: 1, serial_number: 'SN-TEK-2026-003', asset_barcode: 'QR-PHYS-003', current_room_id: 2, condition_state: 'FAIR', operational_status: 'MAINTENANCE' },
      { id: 4, model_id: 2, serial_number: 'SN-MIC-SHURE-01', asset_barcode: 'QR-TECH-010', current_room_id: 3, condition_state: 'GOOD', operational_status: 'IN_STOCK' },
      { id: 5, model_id: 2, serial_number: 'SN-MIC-SHURE-02', asset_barcode: 'QR-TECH-011', current_room_id: 3, condition_state: 'GOOD', operational_status: 'IN_STOCK' },
      { id: 6, model_id: 3, serial_number: 'SN-OLY-0001', asset_barcode: 'QR-PHYS-101', current_room_id: 2, condition_state: 'EXCELLENT', operational_status: 'IN_STOCK' },
    ],

    borrow_requests: [],
    borrow_request_items: [],
    room_booking_details: [],
    inspection_logs: [],
    incidents_and_penalties: [],
  };
})(typeof window !== 'undefined' ? window : globalThis);
