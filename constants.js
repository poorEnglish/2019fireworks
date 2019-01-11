//电子显示数字时，把数字简化成‘日’形，把‘日’形的笔画从上-右-下-左-中分解成三横四竖，NUMS里记录的是各个数字需要的比划
export const NUMS = new Map([
  [0, [1, 2, 3, 4, 5, 6]],
  [1, [2, 3]],
  [2, [1, 2, 4, 5, 7]],
  [3, [1, 2, 3, 4, 7]],
  [4, [2, 3, 6, 7]],
  [5, [1, 3, 4, 6, 7]],
  [6, [1, 3, 4, 5, 6, 7]],
  [7, [1, 2, 3]],
  [8, [1, 2, 3, 4, 5, 6, 7]],
  [9, [1, 2, 3, 4, 6, 7]]
])

export const GAP = 100;

export const OFFSET = new Map([
  [1, {
    lineName: 'row',
    offset: {
      x: 0,
      y: -GAP
    },
    extraDelay: getLiner(2, 0, 7),
    hand: 'middle'
  }],
  [2, {
    lineName: 'col',
    offset: {
      x: GAP / 2,
      y: -GAP / 2
    },
    extraDelay: getLiner(2, 0.17, 7),
    hand: 'right'
  }],
  [3, {
    lineName: 'col',
    offset: {
      x: GAP / 2,
      y: GAP / 2
    },
    extraDelay: getLiner(0,-0.17,7),
    hand: 'right'
  }],
  [4, {
    lineName: 'row',
    offset: {
      x: 0,
      y: GAP
    },
    extraDelay: getLiner(0,0,7),
    hand: 'middle'
  }],
  [5, {
    lineName: 'col',
    offset: {
      x: -GAP / 2,
      y: GAP / 2
    },
    extraDelay: getLiner(0,-0.17,7),
    hand: 'left'
  }],
  [6, {
    lineName: 'col',
    offset: {
      x: -GAP / 2,
      y: -GAP / 2
    },
    extraDelay: getLiner(2, 0.17, 7),
    hand: 'left'
  }],
  [7, {
    lineName: 'row',
    offset: {
      x: 0,
      y: 0
    },
    extraDelay: getLiner(1, 0, 7),
    hand: 'middle'
  }],
])

export const COLORS = {
  // warm: ['#f9aea5', '#c85179','#ffde00', '##594255','#994898','#e4ab9b', '#fddda','#3eb370', '#c20024', '#c85179', '#8d292e', 
  // '#efbb2c', '#e83929', '#a04940', '#ca8269','#f6b894','#0086ad','ffde00','#002665','#3eb370'
  // ],
  warm: ['#B50079', '#FF0000', '#ff4500', '#ffa500', '#ff8000', '#c85179', '#efbb2c', '#c20024', '#c1d8ac'],
  cold: []
}

function getLiner(start, gap, length) {
  let arr = new Array(length).fill(0).map((t, i) => {
    let num = start - i * gap;
    return num >= 0 ? num : 0
  });
  return gap>0?arr:arr.reverse()
}