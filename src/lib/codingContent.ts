// Coding interview preparation content

export interface CodeSolution {
    language: "javascript" | "python" | "java" | "cpp";
    code: string;
}

export interface CodingProblem {
    id: string;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    category: string;
    topics: string[];
    constraints: string[];
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    approach: string;
    solutions: CodeSolution[];
    timeComplexity: string;
    spaceComplexity: string;
}

export interface FundamentalTopic {
    id: string;
    title: string;
    category: "data-structures" | "algorithms" | "complexity" | "problem-solving";
    description: string;
    keyPoints: string[];
    codeExample?: {
        language: string;
        code: string;
    };
}

export interface LanguageTopic {
    id: string;
    language: "javascript" | "python" | "java" | "cpp";
    title: string;
    description: string;
    keyPoints: string[];
    codeExample: string;
}

export interface CodingPattern {
    id: string;
    title: string;
    description: string;
    whenToUse: string[];
    problems: string[];
    codeTemplate: {
        language: string;
        code: string;
    };
}

// Fundamentals Data
export const fundamentals: FundamentalTopic[] = [
    {
        id: "arrays",
        title: "Arrays",
        category: "data-structures",
        description: "A collection of elements stored at contiguous memory locations. Arrays provide O(1) access time but O(n) insertion/deletion.",
        keyPoints: [
            "Fixed size in most languages (dynamic in JavaScript/Python)",
            "O(1) access by index",
            "O(n) search for unsorted arrays",
            "O(n) insertion/deletion (shifting elements)",
            "Cache-friendly due to contiguous memory"
        ],
        codeExample: {
            language: "javascript",
            code: `// Array operations
const arr = [1, 2, 3, 4, 5];

// Access: O(1)
console.log(arr[2]); // 3

// Push: O(1) amortized
arr.push(6);

// Pop: O(1)
arr.pop();

// Unshift: O(n)
arr.unshift(0);

// Search: O(n)
const index = arr.indexOf(3);`
        }
    },
    {
        id: "linked-lists",
        title: "Linked Lists",
        category: "data-structures",
        description: "A linear data structure where elements are stored in nodes, each pointing to the next. Provides O(1) insertion/deletion at known positions.",
        keyPoints: [
            "Dynamic size - no need to pre-allocate memory",
            "O(1) insertion/deletion at head or known position",
            "O(n) access and search",
            "Extra memory for storing pointers",
            "Types: Singly, Doubly, Circular"
        ],
        codeExample: {
            language: "javascript",
            code: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// Create: 1 -> 2 -> 3
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

// Traverse
let current = head;
while (current) {
  console.log(current.val);
  current = current.next;
}`
        }
    },
    {
        id: "hash-tables",
        title: "Hash Tables",
        category: "data-structures",
        description: "A data structure that maps keys to values using a hash function. Provides average O(1) for insert, delete, and search operations.",
        keyPoints: [
            "Average O(1) for insert, delete, search",
            "Worst case O(n) due to collisions",
            "Hash function converts key to index",
            "Collision handling: Chaining or Open Addressing",
            "Load factor affects performance"
        ],
        codeExample: {
            language: "javascript",
            code: `// Using Map in JavaScript
const map = new Map();

// Insert: O(1)
map.set('name', 'John');
map.set('age', 30);

// Access: O(1)
console.log(map.get('name')); // 'John'

// Check existence: O(1)
console.log(map.has('age')); // true

// Delete: O(1)
map.delete('age');

// Using Object as hash map
const obj = {};
obj['key'] = 'value';`
        }
    },
    {
        id: "stacks",
        title: "Stacks",
        category: "data-structures",
        description: "A LIFO (Last In, First Out) data structure. Elements are added and removed from the same end (top).",
        keyPoints: [
            "LIFO - Last In, First Out",
            "O(1) push, pop, and peek operations",
            "Used in: Function calls, undo operations, parsing",
            "Can be implemented using arrays or linked lists",
            "Common interview pattern for bracket matching"
        ],
        codeExample: {
            language: "javascript",
            code: `// Stack using array
const stack = [];

// Push: O(1)
stack.push(1);
stack.push(2);
stack.push(3);

// Peek: O(1)
console.log(stack[stack.length - 1]); // 3

// Pop: O(1)
console.log(stack.pop()); // 3

// Check empty
console.log(stack.length === 0); // false`
        }
    },
    {
        id: "queues",
        title: "Queues",
        category: "data-structures",
        description: "A FIFO (First In, First Out) data structure. Elements are added at the rear and removed from the front.",
        keyPoints: [
            "FIFO - First In, First Out",
            "O(1) enqueue and dequeue",
            "Used in: BFS, task scheduling, buffering",
            "Variants: Deque, Priority Queue, Circular Queue",
            "Array implementation has O(n) dequeue in some languages"
        ],
        codeExample: {
            language: "javascript",
            code: `// Queue using array (simple but O(n) dequeue)
const queue = [];

// Enqueue: O(1)
queue.push(1);
queue.push(2);
queue.push(3);

// Dequeue: O(n) with shift
console.log(queue.shift()); // 1

// For O(1) operations, use linked list or Map`
        }
    },
    {
        id: "trees",
        title: "Trees",
        category: "data-structures",
        description: "A hierarchical data structure with a root node and child nodes. Binary trees have at most 2 children per node.",
        keyPoints: [
            "Hierarchical structure with root and children",
            "Binary Tree: max 2 children per node",
            "BST: left < root < right",
            "Traversals: Inorder, Preorder, Postorder, Level-order",
            "Height-balanced trees ensure O(log n) operations"
        ],
        codeExample: {
            language: "javascript",
            code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Inorder traversal (BST gives sorted order)
function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}`
        }
    },
    {
        id: "graphs",
        title: "Graphs",
        category: "data-structures",
        description: "A collection of nodes (vertices) connected by edges. Can be directed/undirected.  weighted/unweighted.",
        keyPoints: [
            "Vertices (nodes) and Edges (connections)",
            "Directed vs Undirected",
            "Weighted vs Unweighted",
            "Representations: Adjacency List, Adjacency Matrix",
            "Traversals: BFS, DFS"
        ],
        codeExample: {
            language: "javascript",
            code: `// Adjacency List representation
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D'],
  'C': ['A', 'D'],
  'D': ['B', 'C']
};

// BFS traversal
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      queue.push(...graph[node]);
    }
  }
}`
        }
    },
    {
        id: "sorting",
        title: "Sorting Algorithms",
        category: "algorithms",
        description: "Algorithms to arrange elements in a specific order. Key algorithms include Quick Sort, Merge Sort, and Heap Sort.",
        keyPoints: [
            "Bubble Sort: O(n²) - simple but slow",
            "Merge Sort: O(n log n) - stable, uses extra space",
            "Quick Sort: O(n log n) avg - in-place, not stable",
            "Heap Sort: O(n log n) - in-place",
            "Built-in sorts usually O(n log n)"
        ]
    },
    {
        id: "searching",
        title: "Searching Algorithms",
        category: "algorithms",
        description: "Algorithms to find elements in data structures. Binary Search is critical for sorted data.",
        keyPoints: [
            "Linear Search: O(n) - works on any array",
            "Binary Search: O(log n) - requires sorted array",
            "Always consider binary search for sorted data",
            "Binary search template is crucial for interviews",
            "Variations: lower bound, upper bound"
        ],
        codeExample: {
            language: "javascript",
            code: `// Binary Search
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1; // Not found
}`
        }
    },
    {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        category: "algorithms",
        description: "A technique for solving problems by breaking them into overlapping subproblems and storing solutions.",
        keyPoints: [
            "Identify overlapping subproblems",
            "Define state and recurrence relation",
            "Top-down (memoization) vs Bottom-up (tabulation)",
            "Common patterns: 0/1 Knapsack, LCS, LIS",
            "Space optimization often possible"
        ]
    },
    {
        id: "big-o",
        title: "Big O Notation",
        category: "complexity",
        description: "A mathematical notation describing the upper bound of an algorithm's time or space complexity.",
        keyPoints: [
            "O(1) - Constant: Array access",
            "O(log n) - Logarithmic: Binary search",
            "O(n) - Linear: Simple loop",
            "O(n log n) - Linearithmic: Merge sort",
            "O(n²) - Quadratic: Nested loops",
            "O(2^n) - Exponential: Recursive fibonacci"
        ]
    }
];

// Coding Problems
export const codingProblems: CodingProblem[] = [
    {
        id: "two-sum",
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        difficulty: "easy",
        category: "Arrays",
        topics: ["Arrays", "Hash Table"],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists"
        ],
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "nums[0] + nums[1] = 2 + 7 = 9"
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            }
        ],
        approach: "Use a hash map to store each number's complement (target - num) and its index. For each number, check if it exists in the map.",
        solutions: [
            {
                language: "javascript",
                code: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`
            },
            {
                language: "python",
                code: `def twoSum(nums, target):
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
        
        seen[num] = i
    
    return []`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    },
    {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
        difficulty: "easy",
        category: "Stacks",
        topics: ["Stack", "String"],
        constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '(){}[]'"
        ],
        examples: [
            {
                input: 's = "()"',
                output: "true"
            },
            {
                input: 's = "()[]{}"',
                output: "true"
            },
            {
                input: 's = "(]"',
                output: "false"
            }
        ],
        approach: "Use a stack. Push opening brackets onto the stack. When encountering a closing bracket, check if the top of the stack is the matching opening bracket.",
        solutions: [
            {
                language: "javascript",
                code: `function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in pairs) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}`
            },
            {
                language: "python",
                code: `def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    },
    {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        difficulty: "easy",
        category: "Linked Lists",
        topics: ["Linked List", "Recursion"],
        constraints: [
            "The number of nodes in the list is in range [0, 5000]",
            "-5000 <= Node.val <= 5000"
        ],
        examples: [
            {
                input: "head = [1,2,3,4,5]",
                output: "[5,4,3,2,1]"
            },
            {
                input: "head = [1,2]",
                output: "[2,1]"
            }
        ],
        approach: "Iterate through the list, reversing pointers as you go. Keep track of previous, current, and next nodes.",
        solutions: [
            {
                language: "javascript",
                code: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`
            },
            {
                language: "python",
                code: `def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
    },
    {
        id: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
        difficulty: "easy",
        category: "Linked Lists",
        topics: ["Linked List", "Recursion"],
        constraints: [
            "The number of nodes in both lists is in range [0, 50]",
            "-100 <= Node.val <= 100",
            "Both lists are sorted in non-decreasing order"
        ],
        examples: [
            {
                input: "l1 = [1,2,4], l2 = [1,3,4]",
                output: "[1,1,2,3,4,4]"
            }
        ],
        approach: "Use a dummy head and compare nodes from both lists, appending the smaller one. Handle remaining nodes at the end.",
        solutions: [
            {
                language: "javascript",
                code: `function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}`
            },
            {
                language: "python",
                code: `def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next`
            }
        ],
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)"
    },
    {
        id: "best-time-to-buy-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a single day to sell in the future. Return the maximum profit.",
        difficulty: "easy",
        category: "Arrays",
        topics: ["Arrays", "Dynamic Programming"],
        constraints: [
            "1 <= prices.length <= 10^5",
            "0 <= prices[i] <= 10^4"
        ],
        examples: [
            {
                input: "prices = [7,1,5,3,6,4]",
                output: "5",
                explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5"
            },
            {
                input: "prices = [7,6,4,3,1]",
                output: "0",
                explanation: "No transaction is done, max profit = 0"
            }
        ],
        approach: "Keep track of the minimum price seen so far. For each day, calculate potential profit and update max profit.",
        solutions: [
            {
                language: "javascript",
                code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }
  
  return maxProfit;
}`
            },
            {
                language: "python",
                code: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        if price < min_price:
            min_price = price
        else:
            max_profit = max(max_profit, price - min_price)
    
    return max_profit`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
    },
    {
        id: "maximum-subarray",
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        difficulty: "medium",
        category: "Arrays",
        topics: ["Arrays", "Dynamic Programming", "Divide and Conquer"],
        constraints: [
            "1 <= nums.length <= 10^5",
            "-10^4 <= nums[i] <= 10^4"
        ],
        examples: [
            {
                input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
                output: "6",
                explanation: "[4,-1,2,1] has the largest sum = 6"
            }
        ],
        approach: "Kadane's Algorithm: Keep track of current sum and max sum. Reset current sum to 0 when it becomes negative.",
        solutions: [
            {
                language: "javascript",
                code: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`
            },
            {
                language: "python",
                code: `def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
    },
    {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "easy",
        category: "Dynamic Programming",
        topics: ["Dynamic Programming", "Math", "Memoization"],
        constraints: [
            "1 <= n <= 45"
        ],
        examples: [
            {
                input: "n = 2",
                output: "2",
                explanation: "1+1 or 2"
            },
            {
                input: "n = 3",
                output: "3",
                explanation: "1+1+1, 1+2, or 2+1"
            }
        ],
        approach: "This is a Fibonacci problem. ways(n) = ways(n-1) + ways(n-2). Use iterative approach for O(1) space.",
        solutions: [
            {
                language: "javascript",
                code: `function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev1 = 2, prev2 = 1;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}`
            },
            {
                language: "python",
                code: `def climbStairs(n):
    if n <= 2:
        return n
    
    prev1, prev2 = 2, 1
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
    },
    {
        id: "binary-tree-inorder-traversal",
        title: "Binary Tree Inorder Traversal",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        difficulty: "easy",
        category: "Trees",
        topics: ["Trees", "Stack", "DFS"],
        constraints: [
            "The number of nodes in the tree is in [0, 100]",
            "-100 <= Node.val <= 100"
        ],
        examples: [
            {
                input: "root = [1,null,2,3]",
                output: "[1,3,2]"
            }
        ],
        approach: "Recursively visit left subtree, root, then right subtree. Or use a stack for iterative approach.",
        solutions: [
            {
                language: "javascript",
                code: `// Recursive
function inorderTraversal(root) {
  const result = [];
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}

// Iterative
function inorderTraversalIterative(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  
  return result;
}`
            },
            {
                language: "python",
                code: `def inorderTraversal(root):
    result = []
    
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        result.append(node.val)
        inorder(node.right)
    
    inorder(root)
    return result`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    },
    {
        id: "validate-bst",
        title: "Validate Binary Search Tree",
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST has left nodes less than root and right nodes greater.",
        difficulty: "medium",
        category: "Trees",
        topics: ["Trees", "DFS", "BST"],
        constraints: [
            "The number of nodes is in [1, 10^4]",
            "-2^31 <= Node.val <= 2^31 - 1"
        ],
        examples: [
            {
                input: "root = [2,1,3]",
                output: "true"
            },
            {
                input: "root = [5,1,4,null,null,3,6]",
                output: "false",
                explanation: "Root's right child is 4, which is less than root 5"
            }
        ],
        approach: "Use recursion with min/max bounds. Each node must be within valid range based on its ancestors.",
        solutions: [
            {
                language: "javascript",
                code: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return validate(node.left, min, node.val) && 
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}`
            },
            {
                language: "python",
                code: `def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        
        if node.val <= min_val or node.val >= max_val:
            return False
        
        return (validate(node.left, min_val, node.val) and 
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
    },
    {
        id: "coin-change",
        title: "Coin Change",
        description: "Given an array of coin denominations and a total amount, return the fewest number of coins needed to make up that amount. Return -1 if not possible.",
        difficulty: "medium",
        category: "Dynamic Programming",
        topics: ["Dynamic Programming", "BFS"],
        constraints: [
            "1 <= coins.length <= 12",
            "1 <= coins[i] <= 2^31 - 1",
            "0 <= amount <= 10^4"
        ],
        examples: [
            {
                input: "coins = [1,2,5], amount = 11",
                output: "3",
                explanation: "11 = 5 + 5 + 1"
            },
            {
                input: "coins = [2], amount = 3",
                output: "-1"
            }
        ],
        approach: "DP: dp[i] = minimum coins for amount i. For each amount, try all coins and take minimum.",
        solutions: [
            {
                language: "javascript",
                code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}`
            },
            {
                language: "python",
                code: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`
            }
        ],
        timeComplexity: "O(amount * coins)",
        spaceComplexity: "O(amount)"
    },
    {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence",
        description: "Given two strings, return the length of their longest common subsequence. A subsequence is a sequence derived from another sequence by deleting some elements without changing the order.",
        difficulty: "medium",
        category: "Dynamic Programming",
        topics: ["Dynamic Programming", "String"],
        constraints: [
            "1 <= text1.length, text2.length <= 1000",
            "Strings consist of lowercase English letters"
        ],
        examples: [
            {
                input: 'text1 = "abcde", text2 = "ace"',
                output: "3",
                explanation: 'LCS is "ace"'
            }
        ],
        approach: "2D DP: dp[i][j] = LCS length for text1[0:i] and text2[0:j]. If chars match, add 1 to diagonal; else take max of left/top.",
        solutions: [
            {
                language: "javascript",
                code: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null)
    .map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  
  return dp[m][n];
}`
            },
            {
                language: "python",
                code: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`
            }
        ],
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)"
    },
    {
        id: "number-of-islands",
        title: "Number of Islands",
        description: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.",
        difficulty: "medium",
        category: "Graphs",
        topics: ["Graph", "DFS", "BFS", "Union Find"],
        constraints: [
            "m == grid.length",
            "n == grid[i].length",
            "1 <= m, n <= 300",
            "grid[i][j] is '0' or '1'"
        ],
        examples: [
            {
                input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
                output: "2"
            }
        ],
        approach: "DFS/BFS: For each unvisited '1', increment count and mark all connected '1's as visited.",
        solutions: [
            {
                language: "javascript",
                code: `function numIslands(grid) {
  if (!grid.length) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || 
        grid[r][c] === '0') {
      return;
    }
    
    grid[r][c] = '0'; // Mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  
  return count;
}`
            },
            {
                language: "python",
                code: `def numIslands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            grid[r][c] == '0'):
            return
        
        grid[r][c] = '0'  # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count`
            }
        ],
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)"
    },
    {
        id: "container-with-most-water",
        title: "Container With Most Water",
        description: "Given n non-negative integers representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.",
        difficulty: "medium",
        category: "Arrays",
        topics: ["Arrays", "Two Pointers", "Greedy"],
        constraints: [
            "n == height.length",
            "2 <= n <= 10^5",
            "0 <= height[i] <= 10^4"
        ],
        examples: [
            {
                input: "height = [1,8,6,2,5,4,8,3,7]",
                output: "49",
                explanation: "Lines at index 1 and 8 form container with area 7 * 7 = 49"
            }
        ],
        approach: "Two pointers from both ends. Move the pointer with smaller height inward, as that might find a taller line.",
        solutions: [
            {
                language: "javascript",
                code: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * h);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxWater;
}`
            },
            {
                language: "python",
                code: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
    },
    {
        id: "3sum",
        title: "3Sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0. No duplicate triplets.",
        difficulty: "medium",
        category: "Arrays",
        topics: ["Arrays", "Two Pointers", "Sorting"],
        constraints: [
            "3 <= nums.length <= 3000",
            "-10^5 <= nums[i] <= 10^5"
        ],
        examples: [
            {
                input: "nums = [-1,0,1,2,-1,-4]",
                output: "[[-1,-1,2],[-1,0,1]]"
            }
        ],
        approach: "Sort array. For each element, use two pointers to find pairs that sum to -element. Skip duplicates.",
        solutions: [
            {
                language: "javascript",
                code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    
    let left = i + 1, right = nums.length - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left+1]) left++;
        while (left < right && nums[right] === nums[right-1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}`
            },
            {
                language: "python",
                code: `def threeSum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return result`
            }
        ],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    {
        id: "lru-cache",
        title: "LRU Cache",
        description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get and put operations in O(1) time.",
        difficulty: "hard",
        category: "Design",
        topics: ["Hash Table", "Linked List", "Design"],
        constraints: [
            "1 <= capacity <= 3000",
            "0 <= key <= 10^4",
            "0 <= value <= 10^5",
            "At most 2 * 10^5 calls to get and put"
        ],
        examples: [
            {
                input: 'LRUCache cache = new LRUCache(2); cache.put(1,1); cache.put(2,2); cache.get(1); cache.put(3,3); cache.get(2);',
                output: "1, -1",
                explanation: "After put(3,3), key 2 was evicted (least recently used)"
            }
        ],
        approach: "Use a hash map + doubly linked list. Hash map for O(1) lookup, linked list for O(1) removal and insertion at ends.",
        solutions: [
            {
                language: "javascript",
                code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Delete oldest (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
}`
            },
            {
                language: "python",
                code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = value
        
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`
            }
        ],
        timeComplexity: "O(1) for both get and put",
        spaceComplexity: "O(capacity)"
    },
    {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        difficulty: "hard",
        category: "Arrays",
        topics: ["Arrays", "Two Pointers", "Stack", "Dynamic Programming"],
        constraints: [
            "n == height.length",
            "1 <= n <= 2 * 10^4",
            "0 <= height[i] <= 10^5"
        ],
        examples: [
            {
                input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
                output: "6"
            }
        ],
        approach: "Two pointers: Water at position = min(maxLeft, maxRight) - height. Move pointer with smaller max.",
        solutions: [
            {
                language: "javascript",
                code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}`
            },
            {
                language: "python",
                code: `def trap(height):
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    
    return water`
            }
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
    }
];

// Coding Patterns
export const codingPatterns: CodingPattern[] = [
    {
        id: "two-pointers",
        title: "Two Pointers",
        description: "Use two pointers to traverse a data structure from different positions or at different speeds to solve problems efficiently.",
        whenToUse: [
            "Sorted arrays with pair/triplet sum problems",
            "Palindrome checking",
            "Removing duplicates in-place",
            "Comparing strings/arrays"
        ],
        problems: ["two-sum", "3sum", "container-with-most-water", "trapping-rain-water"],
        codeTemplate: {
            language: "javascript",
            code: `function twoPointers(arr) {
  let left = 0, right = arr.length - 1;
  
  while (left < right) {
    // Process based on condition
    if (condition) {
      left++;
    } else {
      right--;
    }
  }
}`
        }
    },
    {
        id: "sliding-window",
        title: "Sliding Window",
        description: "Maintain a window over a portion of data and slide it to find optimal subarrays or substrings.",
        whenToUse: [
            "Finding longest/shortest substring with condition",
            "Maximum/minimum sum subarray of size k",
            "String permutation/anagram problems",
            "Contiguous subarray problems"
        ],
        problems: ["maximum-subarray"],
        codeTemplate: {
            language: "javascript",
            code: `function slidingWindow(arr, k) {
  let left = 0, right = 0;
  let windowState = {}; // or a number for sum
  
  while (right < arr.length) {
    // Expand window
    windowState.add(arr[right]);
    
    while (windowInvalid) {
      // Shrink window
      windowState.remove(arr[left]);
      left++;
    }
    
    // Update result
    right++;
  }
}`
        }
    },
    {
        id: "fast-slow-pointers",
        title: "Fast & Slow Pointers",
        description: "Use two pointers moving at different speeds to detect cycles or find middle elements.",
        whenToUse: [
            "Detecting cycles in linked lists",
            "Finding middle of linked list",
            "Finding cycle start point",
            "Happy number problem"
        ],
        problems: ["reverse-linked-list"],
        codeTemplate: {
            language: "javascript",
            code: `function hasCycle(head) {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  
  return false;
}`
        }
    },
    {
        id: "bfs-dfs",
        title: "BFS & DFS",
        description: "Graph/tree traversal techniques. BFS uses queue for level-order, DFS uses stack/recursion for depth exploration.",
        whenToUse: [
            "Tree/graph traversal",
            "Finding shortest path (BFS)",
            "Detecting cycles",
            "Connected components",
            "Topological sorting"
        ],
        problems: ["number-of-islands", "binary-tree-inorder-traversal", "validate-bst"],
        codeTemplate: {
            language: "javascript",
            code: `// BFS Template
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// DFS Template
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  
  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}`
        }
    },
    {
        id: "dynamic-programming-pattern",
        title: "Dynamic Programming",
        description: "Break problems into overlapping subproblems and store solutions to avoid recomputation.",
        whenToUse: [
            "Optimization problems (min/max)",
            "Counting problems",
            "Problems with overlapping subproblems",
            "Decision making at each step"
        ],
        problems: ["climbing-stairs", "coin-change", "longest-common-subsequence"],
        codeTemplate: {
            language: "javascript",
            code: `// Bottom-up DP Template
function dp(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = baseCase;
  
  for (let i = 1; i <= n; i++) {
    dp[i] = transition(dp[i-1], ...);
  }
  
  return dp[n];
}

// Top-down with memoization
function dpMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (isBaseCase(n)) return baseValue;
  
  memo[n] = transition(dpMemo(n-1, memo), ...);
  return memo[n];
}`
        }
    }
];

// Language-specific topics
export const languageTopics: LanguageTopic[] = [
    {
        id: "js-closures",
        language: "javascript",
        title: "Closures",
        description: "A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned.",
        keyPoints: [
            "Functions retain access to their lexical environment",
            "Used for data privacy and encapsulation",
            "Common in callbacks and event handlers",
            "Can cause memory issues if not handled properly"
        ],
        codeExample: `function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2`
    },
    {
        id: "js-promises",
        language: "javascript",
        title: "Promises & Async/Await",
        description: "Promises represent the eventual completion of an asynchronous operation. Async/await provides a cleaner syntax for working with promises.",
        keyPoints: [
            "Promises have three states: pending, fulfilled, rejected",
            "Use .then() for chaining, .catch() for errors",
            "async/await makes async code look synchronous",
            "Always handle errors with try/catch or .catch()"
        ],
        codeExample: `// Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data'), 1000);
  });
}

// Async/Await
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Promise.all for parallel execution
const results = await Promise.all([
  fetchData(),
  fetchData()
]);`
    },
    {
        id: "python-list-comprehension",
        language: "python",
        title: "List Comprehensions",
        description: "A concise way to create lists based on existing lists or iterables with optional filtering.",
        keyPoints: [
            "More readable and often faster than loops",
            "Can include conditional filtering",
            "Supports nested comprehensions",
            "Also works for dicts, sets, and generators"
        ],
        codeExample: `# Basic list comprehension
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dict comprehension
word_lengths = {word: len(word) for word in ['hello', 'world']}

# Generator expression (memory efficient)
sum_squares = sum(x**2 for x in range(1000000))`
    },
    {
        id: "python-decorators",
        language: "python",
        title: "Decorators",
        description: "Functions that modify the behavior of other functions. Used for logging, authentication, memoization, etc.",
        keyPoints: [
            "Decorators wrap a function to extend its behavior",
            "Use @decorator syntax for cleaner code",
            "Common decorators: @staticmethod, @classmethod, @property",
            "Can be stacked (applied multiple times)"
        ],
        codeExample: `import functools

def memoize(func):
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Fast due to memoization`
    },
    {
        id: "java-collections",
        language: "java",
        title: "Collections Framework",
        description: "Java's built-in data structure library providing implementations of common data structures.",
        keyPoints: [
            "List: ArrayList (dynamic array), LinkedList",
            "Set: HashSet (unordered), TreeSet (sorted)",
            "Map: HashMap, TreeMap, LinkedHashMap",
            "Queue: PriorityQueue, ArrayDeque"
        ],
        codeExample: `import java.util.*;

// ArrayList - dynamic array
List<Integer> list = new ArrayList<>();
list.add(1);
list.get(0);

// HashMap - key-value store
Map<String, Integer> map = new HashMap<>();
map.put("key", 1);
map.getOrDefault("missing", 0);

// HashSet - unique elements
Set<Integer> set = new HashSet<>();
set.add(1);
set.contains(1);

// PriorityQueue - min heap by default
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3);
pq.poll(); // returns smallest`
    },
    {
        id: "cpp-stl",
        language: "cpp",
        title: "Standard Template Library (STL)",
        description: "C++'s powerful library of containers, algorithms, and iterators for efficient coding.",
        keyPoints: [
            "vector: dynamic array",
            "map/unordered_map: key-value pairs",
            "set/unordered_set: unique elements",
            "priority_queue: heap implementation"
        ],
        codeExample: `#include <vector>
#include <unordered_map>
#include <queue>
#include <algorithm>

// Vector
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());

// Unordered Map
unordered_map<string, int> mp;
mp["key"] = 1;
if (mp.count("key")) { /* exists */ }

// Priority Queue (max heap)
priority_queue<int> pq;
pq.push(3);
int top = pq.top();
pq.pop();

// Min heap
priority_queue<int, vector<int>, greater<int>> minPq;`
    }
];

// Category definitions for UI
export const categories = {
    fundamentals: [
        { id: "data-structures", label: "Data Structures", icon: "Database" },
        { id: "algorithms", label: "Algorithms", icon: "Settings" },
        { id: "complexity", label: "Complexity", icon: "Clock" }
    ],
    problemCategories: [
        { id: "Arrays", label: "Arrays" },
        { id: "Linked Lists", label: "Linked Lists" },
        { id: "Stacks", label: "Stacks" },
        { id: "Trees", label: "Trees" },
        { id: "Graphs", label: "Graphs" },
        { id: "Dynamic Programming", label: "Dynamic Programming" },
        { id: "Design", label: "Design" }
    ],
    languages: [
        { id: "javascript", label: "JavaScript" },
        { id: "python", label: "Python" },
        { id: "java", label: "Java" },
        { id: "cpp", label: "C++" }
    ]
};
