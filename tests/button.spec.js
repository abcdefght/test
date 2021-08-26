import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {afterEach, beforeEach, it} from "@jest/globals";

import Button from "@com/public/button";

let container = null;
beforeEach(() => {
    // 创建一个 DOM 元素作为渲染目标
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("测试button组件", () => {
    act(() => {
        render(<Button>login</Button>, container);
    });
    expect(container.textContent).toBe("login");
});
