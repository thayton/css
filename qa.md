- What are the different positioning schemes?

Normal Flow, float and absolute positioning. Normal flow includes block formatting of block-level boxes, inline formatting of inline-level boxes, and relative positioning of block-level and inline-level boxes.

- What is a containing block?

The position and size of an element's box(es) are sometimes calculated relative to a certain rectangle, called the containing block of the element. 

- What is the containing block in which the root element lives?

The containing block in which the root element lives is a rectangle called the *initial containing block*. For continuous media, it has the dimensions of the viewport and is anchored at the canvas origin; it is the page area for paged media. The 'direction' property of the initial containing block is the same as for the root element.

- What is the containing block of an element whose position is 'relative' or 'static'? 

The containing block is formed by the content edge of the nearest block container ancestor box.

- What is the containing block of an element whose position is 'fixed'? 

The containing block is established by the viewport in the case of continuous media or the page area in the case of paged media.

- What is the containing block of an element whose position is 'absolute'? 

The containing block is established by the nearest ancestor with a 'position' of 'absolute', 'relative' or 'fixed', in the following way:
  1. In the case that the ancestor is an inline element, the containing block is the bounding box around the padding boxes of the first and the last inline boxes generated for that element. In CSS 2.1, if the inline element is split across multiple lines, the containing block is undefined.
  2. Otherwise, the containing block is formed by the padding edge of the ancestor.

  If there is no such ancestor, the containing block is the initial containing block.

- (T/F) Each block is given a position with respect to its containing block.

True.

- (T/F) A block is confined by its containing block.

False. The block may overflow its containing block.

- What CSS property specifies a box's type?

The *display* property specifies a box's type.

- (T/F) Every element on a page is a rectangular box.

True. Each element in the document tree generates zero or more boxes according to the box model.

- What is the difference between paged media and continuous media?

- The following values of the 'display' property make an element block-level:
   _____________, _____________, and _____________.

block, list-item, table

- Block-level boxes are boxes that participate in a _____________ formatting context.

block

- Each block-level element generates a _____________ block-level box that contains descendent boxes and generated content.

principal

- (T/F) A block-level box is also a container box.

True.

- (T/F) A block container box either contains block-level boxes or inline-level boxes but not both.

True

- What is a *block container box*?

A block container box either contains only block-level boxes or establishes an inline formatting context and thus contains only inline-level boxes.

- (T/F) Not all block container boxes are block-level boxes.
 
True. Non-replaced inline blocks and non-replaced table cells are block containers but not block-level boxes.

- In the visual formatting model, each element in the document tree generates zero or more ____________ according to the ______________ model.

boxes, box

- The containing block in which the root element lives is a rectangle called the _______________.

Initial containing block.

- What is a replaced element?

- Replaced elements often have _____________ dimensions.

- (T/F) A "!important" declaration takes precedence over a normal declaration.

True.

- List the different parts of a selector's specificity: a-b-c-d

- Give two examples of block container boxes that are NOT block-level boxes.

Non-replaced inline blocks, non-replaced table cells.

- What are block boxes?

Block boxes are block-level boxes that are also block containers.

- (T/F) The properties of anonymous boxes are inherited from the enclosing non-anonymous box.

True.

- What are inline-level elements?

*Inline-level* elements are those elements of the source document that do not form new blocks of content; the content is distributed in lines.

- What values of the 'display' property make an element inline-level?

The following values of the *display* property make an element inline-level: 'inline', 'inline-table', and 'inline-block'

- What is an inline box?

An *inline box* is one that is both inline-level and whose contents participate in its containing inline formatting context.

- Give some examples of inline-level boxes that are not inline boxes.

Replaced inline-level elements, inline-block elements, and inline-table elements.

- Given the following HTML ```<p>Some <em>emphasized</em> text</p>``` How many block boxes are generated? How many inline boxes are generated? Which of the inline boxes are anonymous and why?

The ```<p>``` generates a block box.
The box for "emphasized" is an inline box generated by an inline element (```<em>```).
"Some" and "text" are contained in anonymous inline boxes, because they do not have associated inline-level elements.

- What CSS properties determine the positioning scheme?

The *position* and *float* properties determine which positioning algorithm is used to calculate the position of a box.

- Do the 'top', 'right', 'bottom' and 'left' properties affect a box whose position is 'static'?

No.

- A relatively positioned box is positioned relative to ________________.

Its normal position.

- When a box B is relatively positioned, the position of the box following B is calculated as though B were ____________.

Not offset.

- Are absolutely positioned boxes taken out of the normal flow?

Yes.

- Do absolutely positioned boxes have an impact on the layout of later siblings.

No, because they (absolutely positioned boxes) are taken out of the normal flow.

- Do absolutely positioned boxes have margins?

Yes.

- Do the margins of absolutely positioned boxes collapse with any other margins?

No, they do not collapse with other margins.

- What CSS properties are used to specify an absolutely positioned box's position?

'top', 'right', 'bottom' and 'left' properties.

- The offsets of an absolutely positioned box are specified in respect to _________________.

Its containing block.

29. An element is said to be 'positioned' if its 'position' property has a value other than ___________.

30. Boxes in the normal flow belong to a formatting context, which may be _______________ or ____________, but not both simultaneously.

31. In a block formatting context, how are boxes laid out?

32. In a block formatting context, the vertical distance between two sibling boxes is determined by the ____________ properties.

33. (T/F) When an element is floated, it will flow all the way to the edge of its parent element.

34. When an element is floated, the width of the element defaults to be the width of ______________.

35. (T/F) Veritical margins between adjacent block-level boxes in a block formatting context collapse.

36. In an inline formatting context, how are boxes laid out?

37. The rectangular area that contains the boxes that form a line is called a ______________ box.

38. (T/F) A line box is always tall enough for all of the boxes it contains.

39. If both 'margin-left' and 'margin-right' are 'auto', their used values are _____________.

40. (T/F) When you float multiple elements in the same direction, they will stack horizontally.

41. An element is called 'out of flow' if it is __________________, __________________, or __________________.
