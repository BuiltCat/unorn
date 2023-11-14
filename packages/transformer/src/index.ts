// 直接运行时？写在 style 里面？有点不想 但是目前看来好像是比较快（运行速度快）的方式
// 直接使用 context 和 provide   
// 不使用 ast 直接提取文件 然后变更
// <View style={un('a b c')}> => <View style={{  a: 1, b: 2, c:3 }} >
// <View style={[a, un('a b c')]} > => <View style={[a, {a: 1, b: 2, c: 3}]} >
// 先实现功能，再实现 preset
// todo:
// 1. 生成的 css 感觉有点繁琐
// 2. 之后搞 theme Variants Shortcuts Layers(研究下，感觉不太需要) preflights(同上)
// 3. 尝试使用 ts 去推导 useUn 的所有类型

import { UnContext } from "./context";
import { UnProvider } from "./provider";
import { useUn } from './useUn'

export {
    UnProvider,
    UnContext,
    useUn
}