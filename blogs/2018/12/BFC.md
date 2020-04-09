
### [BFC](https://drafts.csswg.org/css-display/#bfc)
Abbreviation for block formatting context or block formatting context root. Has various informal definitions referring to boxes which contain internal floats, exclude external floats, and suppress margin collapsing, and may therefore refer specifically to one of:
* a block container that establishes a new block formatting context for its contents

* a block box (i.e. a block-level block container) that establishes a block formatting context for its contents (as distinguished from a block box which does not)

* (very loosely) any block-level box that establishes a new formatting context (other than an inline formatting context)

### block formatting context root
A block container that establishes a new block formatting context.

### Normal flow
Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously. Block-level boxes participate in a **block formatting context**. Inline-level boxes participate in an **inline formatting context**.

### [BFC定义] 9.4.1 Block formatting contexts (https://drafts.csswg.org/css-display/#bfc)
Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).

For information about page breaks in paged media, please consult the section on allowed page breaks.

###  Inline formatting contexts


### block
<table>
<tr><td>Short display</td><td>full display</td><td>Generated box</td></tr>
<tr><td>block</td><td>ck flo</td><td> block-level || block container aka block box</td></tr>
<table>

Used as a shorthand for **block box**, **block-level box**, or **block container box**, where unambiguous.

### [block box](https://drafts.csswg.org/css-display/#block-box)
A block-level box that is also a block container.

> Note: Not all block container boxes are block-level boxes: non-replaced inline blocks and non-replaced table cells, for example, are block containers but not block-level boxes. **Similarly, not all block-level boxes are block containers: block-level replaced elements (display: block) and flex containers (display: flex), for example, are not block containers.**


### [block container](https://drafts.csswg.org/css-display/#block-container)
A block container either contains only inline-level boxes participating in an inline formatting context, or contains only block-level boxes participating in a block formatting context (possibly generating anonymous block boxes to ensure this constraint, as defined in CSS2§9.2.1.1).
A block container that contains only inline-level content establishes a new inline formatting context. The element then also generates a root inline box which wraps all of its inline content. Note, this root inline box concept effectively replaces the "anonymous inline element" concept introduced in CSS2§9.2.2.1.

A block container establishes a new block formatting context if its parent formatting context is not a block formatting context; otherwise, when participating in a block formatting context itself, it either establishes a new block formatting context for its contents or continues the one in which it participates, as determined by the constraints of other properties (such as overflow or align-content).

> Note: A block container box can both establish a block formatting context and an inline formatting context simultaneously.




### [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
A block formatting context is a part of a visual CSS rendering of a Web page. It is the region in which the layout of block boxes occurs and in which floats interact with other elements.


### 小结
A block formatting context contains everything inside of the element creating it.
触发的条件等同于：display: flow-root