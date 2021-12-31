import * as React from 'react';

const MenuDropDown = () => {
  return (
    <div className="menu_drop_down w_180 absolute flex_col">
      <div className="flex w_full mar_b_10">
        <div className="bg_dark w_40 h_40 circle"></div>
        <div className="flex_1 h_full mar_l_10">
          <div className="font_14 mar_b_5">김코딩</div>
          <div className="font_10">kimcoding@gmail.com</div>
        </div>
      </div>
      <ul className="menu_list w_full flex_col">
        <li className="menu">나의 세트</li>
        <li className="menu">프로필 설정</li>
        <li className="menu">로그아웃</li>
      </ul>
    </div>
  );
};

export default MenuDropDown;