
### react Tree 与 dom tree 是关联还是引用？
node[internalInstanceKey]保存fiber 实例。fiber.stateNode 保存node实例。

### fiber 是递归吗？
递归方法直观，非常适合遍历树。但是正如我们发现的，它有局限性。最大的一点就是我们无法分解工作为增量单元。我们不能暂停特定组件的工作并在稍后恢复。通过这种方法，React只能不断迭代直到它处理完所有组件，并且堆栈为空。