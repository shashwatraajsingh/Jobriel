"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Square, Filter, Search, ExternalLink } from "lucide-react"

interface DSAQuestion {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: string
  pattern: string
  companies: string[]
  leetcodeUrl?: string
}

const dsaQuestions: DSAQuestion[] = [
  // Arrays & Hashing
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays & Hashing", pattern: "Hash Map", companies: ["Google", "Amazon", "Microsoft", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/two-sum/" },
  { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays & Hashing", pattern: "Sliding Window", companies: ["Amazon", "Microsoft", "Goldman Sachs"], leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { id: 3, title: "Contains Duplicate", difficulty: "Easy", topic: "Arrays & Hashing", pattern: "Hash Set", companies: ["Google", "Apple", "Adobe"], leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/" },
  { id: 4, title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays & Hashing", pattern: "Prefix Sum", companies: ["Facebook", "Amazon", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/" },
  { id: 5, title: "Maximum Subarray", difficulty: "Medium", topic: "Arrays & Hashing", pattern: "Kadane's Algorithm", companies: ["Google", "Amazon", "LinkedIn"], leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/" },
  
  // Two Pointers
  { id: 6, title: "Valid Palindrome", difficulty: "Easy", topic: "Two Pointers", pattern: "Two Pointers", companies: ["Facebook", "Microsoft", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/" },
  { id: 7, title: "3Sum", difficulty: "Medium", topic: "Two Pointers", pattern: "Two Pointers", companies: ["Amazon", "Google", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/3sum/" },
  { id: 8, title: "Container With Most Water", difficulty: "Medium", topic: "Two Pointers", pattern: "Two Pointers", companies: ["Amazon", "Google", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/" },
  
  // Sliding Window
  { id: 9, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window", companies: ["Amazon", "Google", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { id: 10, title: "Longest Repeating Character Replacement", difficulty: "Medium", topic: "Sliding Window", pattern: "Sliding Window", companies: ["Google", "Facebook", "Uber"], leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { id: 11, title: "Minimum Window Substring", difficulty: "Hard", topic: "Sliding Window", pattern: "Sliding Window", companies: ["Facebook", "Google", "Uber"], leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/" },
  
  // Stack
  { id: 12, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", pattern: "Stack", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/" },
  { id: 13, title: "Min Stack", difficulty: "Medium", topic: "Stack", pattern: "Stack Design", companies: ["Amazon", "Google", "Bloomberg"], leetcodeUrl: "https://leetcode.com/problems/min-stack/" },
  { id: 14, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", topic: "Stack", pattern: "Stack", companies: ["LinkedIn", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { id: 15, title: "Daily Temperatures", difficulty: "Medium", topic: "Stack", pattern: "Monotonic Stack", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/" },
  
  // Binary Search
  { id: 16, title: "Binary Search", difficulty: "Easy", topic: "Binary Search", pattern: "Binary Search", companies: ["Google", "Amazon", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/binary-search/" },
  { id: 17, title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search", pattern: "Modified Binary Search", companies: ["Facebook", "Amazon", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { id: 18, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search", pattern: "Modified Binary Search", companies: ["Amazon", "Microsoft", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { id: 19, title: "Search a 2D Matrix", difficulty: "Medium", topic: "Binary Search", pattern: "2D Binary Search", companies: ["Amazon", "Google", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/" },
  
  // Linked List
  { id: 20, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", pattern: "Linked List Reversal", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/" },
  { id: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", topic: "Linked List", pattern: "Merge", companies: ["Amazon", "Google", "Apple"], leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { id: 22, title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List", pattern: "Fast & Slow Pointers", companies: ["Amazon", "Microsoft", "Yahoo"], leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/" },
  { id: 23, title: "Remove Nth Node From End of List", difficulty: "Medium", topic: "Linked List", pattern: "Two Pointers", companies: ["Amazon", "Google", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { id: 24, title: "Reorder List", difficulty: "Medium", topic: "Linked List", pattern: "Multiple Patterns", companies: ["Facebook", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/reorder-list/" },
  
  // Trees
  { id: 25, title: "Invert Binary Tree", difficulty: "Easy", topic: "Trees", pattern: "Tree Traversal", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/" },
  { id: 26, title: "Maximum Depth of Binary Tree", difficulty: "Easy", topic: "Trees", pattern: "DFS", companies: ["LinkedIn", "Amazon", "Apple"], leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { id: 27, title: "Same Tree", difficulty: "Easy", topic: "Trees", pattern: "Tree Comparison", companies: ["Bloomberg", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/same-tree/" },
  { id: 28, title: "Subtree of Another Tree", difficulty: "Easy", topic: "Trees", pattern: "Tree Matching", companies: ["Facebook", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { id: 29, title: "Lowest Common Ancestor of BST", difficulty: "Medium", topic: "Trees", pattern: "BST Properties", companies: ["Amazon", "Facebook", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { id: 30, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", pattern: "BFS", companies: ["Amazon", "Facebook", "LinkedIn"], leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { id: 31, title: "Validate Binary Search Tree", difficulty: "Medium", topic: "Trees", pattern: "BST Validation", companies: ["Amazon", "Facebook", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { id: 32, title: "Kth Smallest Element in a BST", difficulty: "Medium", topic: "Trees", pattern: "Inorder Traversal", companies: ["Google", "Amazon", "Uber"], leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
  { id: 33, title: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium", topic: "Trees", pattern: "Tree Construction", companies: ["Amazon", "Microsoft", "Bloomberg"], leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  
  // Tries
  { id: 34, title: "Implement Trie", difficulty: "Medium", topic: "Tries", pattern: "Trie Implementation", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { id: 35, title: "Word Search II", difficulty: "Hard", topic: "Tries", pattern: "Trie + Backtracking", companies: ["Google", "Amazon", "Airbnb"], leetcodeUrl: "https://leetcode.com/problems/word-search-ii/" },
  
  // Heap / Priority Queue
  { id: 36, title: "Kth Largest Element in an Array", difficulty: "Medium", topic: "Heap", pattern: "Quick Select / Heap", companies: ["Facebook", "Amazon", "Apple"], leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { id: 37, title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap", pattern: "Heap + Hash Map", companies: ["Amazon", "Facebook", "Yelp"], leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { id: 38, title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap", pattern: "Two Heaps", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/" },
  
  // Backtracking
  { id: 39, title: "Combination Sum", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking", companies: ["Airbnb", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/combination-sum/" },
  { id: 40, title: "Word Search", difficulty: "Medium", topic: "Backtracking", pattern: "2D Backtracking", companies: ["Microsoft", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/word-search/" },
  { id: 41, title: "Palindrome Partitioning", difficulty: "Medium", topic: "Backtracking", pattern: "Partition Backtracking", companies: ["Amazon", "Google", "Uber"], leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/" },
  { id: 42, title: "Letter Combinations of Phone Number", difficulty: "Medium", topic: "Backtracking", pattern: "Backtracking", companies: ["Amazon", "Google", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
  { id: 43, title: "N-Queens", difficulty: "Hard", topic: "Backtracking", pattern: "Constraint Backtracking", companies: ["Amazon", "Microsoft", "Zenefits"], leetcodeUrl: "https://leetcode.com/problems/n-queens/" },
  
  // Graphs
  { id: 44, title: "Number of Islands", difficulty: "Medium", topic: "Graphs", pattern: "DFS/BFS", companies: ["Amazon", "Google", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/number-of-islands/" },
  { id: 45, title: "Clone Graph", difficulty: "Medium", topic: "Graphs", pattern: "Graph Cloning", companies: ["Facebook", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/clone-graph/" },
  { id: 46, title: "Pacific Atlantic Water Flow", difficulty: "Medium", topic: "Graphs", pattern: "Multi-source DFS", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
  { id: 47, title: "Course Schedule", difficulty: "Medium", topic: "Graphs", pattern: "Topological Sort", companies: ["Google", "Amazon", "Zenefits"], leetcodeUrl: "https://leetcode.com/problems/course-schedule/" },
  { id: 48, title: "Graph Valid Tree", difficulty: "Medium", topic: "Graphs", pattern: "Union Find", companies: ["Google", "Facebook", "Zenefits"], leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/" },
  { id: 49, title: "Number of Connected Components", difficulty: "Medium", topic: "Graphs", pattern: "Union Find", companies: ["Google", "Facebook", "LinkedIn"], leetcodeUrl: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
  
  // Advanced Graphs
  { id: 50, title: "Alien Dictionary", difficulty: "Hard", topic: "Advanced Graphs", pattern: "Topological Sort", companies: ["Google", "Facebook", "Airbnb"], leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/" },
  { id: 51, title: "Network Delay Time", difficulty: "Medium", topic: "Advanced Graphs", pattern: "Dijkstra's Algorithm", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/network-delay-time/" },
  { id: 52, title: "Cheapest Flights Within K Stops", difficulty: "Medium", topic: "Advanced Graphs", pattern: "Bellman Ford", companies: ["Google", "Amazon", "Expedia"], leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
  
  // Dynamic Programming
  { id: 53, title: "Climbing Stairs", difficulty: "Easy", topic: "Dynamic Programming", pattern: "1D DP", companies: ["Amazon", "Adobe", "Apple"], leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/" },
  { id: 54, title: "House Robber", difficulty: "Medium", topic: "Dynamic Programming", pattern: "1D DP", companies: ["Amazon", "LinkedIn", "Adobe"], leetcodeUrl: "https://leetcode.com/problems/house-robber/" },
  { id: 55, title: "House Robber II", difficulty: "Medium", topic: "Dynamic Programming", pattern: "Circular DP", companies: ["Microsoft", "Amazon", "Google"], leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/" },
  { id: 56, title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Dynamic Programming", pattern: "2D DP", companies: ["Amazon", "Microsoft", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { id: 57, title: "Palindromic Substrings", difficulty: "Medium", topic: "Dynamic Programming", pattern: "2D DP", companies: ["Facebook", "LinkedIn", "PayPal"], leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/" },
  { id: 58, title: "Decode Ways", difficulty: "Medium", topic: "Dynamic Programming", pattern: "1D DP", companies: ["Facebook", "Uber", "Microsoft"], leetcodeUrl: "https://leetcode.com/problems/decode-ways/" },
  { id: 59, title: "Coin Change", difficulty: "Medium", topic: "Dynamic Programming", pattern: "Unbounded Knapsack", companies: ["Amazon", "Google", "Uber"], leetcodeUrl: "https://leetcode.com/problems/coin-change/" },
  { id: 60, title: "Maximum Product Subarray", difficulty: "Medium", topic: "Dynamic Programming", pattern: "Modified Kadane's", companies: ["LinkedIn", "Google", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/" },
  { id: 61, title: "Word Break", difficulty: "Medium", topic: "Dynamic Programming", pattern: "1D DP", companies: ["Google", "Facebook", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/word-break/" },
  { id: 62, title: "Longest Increasing Subsequence", difficulty: "Medium", topic: "Dynamic Programming", pattern: "LIS Pattern", companies: ["Microsoft", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/" },
  { id: 63, title: "Partition Equal Subset Sum", difficulty: "Medium", topic: "Dynamic Programming", pattern: "0/1 Knapsack", companies: ["Facebook", "Amazon", "eBay"], leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/" },
  
  // 2D Dynamic Programming
  { id: 64, title: "Unique Paths", difficulty: "Medium", topic: "2D Dynamic Programming", pattern: "2D DP", companies: ["Google", "Bloomberg", "Adobe"], leetcodeUrl: "https://leetcode.com/problems/unique-paths/" },
  { id: 65, title: "Longest Common Subsequence", difficulty: "Medium", topic: "2D Dynamic Programming", pattern: "2D DP", companies: ["Google", "Amazon", "Uber"], leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/" },
  { id: 66, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", topic: "2D Dynamic Programming", pattern: "State Machine DP", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
  { id: 67, title: "Coin Change 2", difficulty: "Medium", topic: "2D Dynamic Programming", pattern: "Unbounded Knapsack", companies: ["Facebook", "Amazon", "Bloomberg"], leetcodeUrl: "https://leetcode.com/problems/coin-change-2/" },
  { id: 68, title: "Target Sum", difficulty: "Medium", topic: "2D Dynamic Programming", pattern: "Subset Sum", companies: ["Google", "Facebook", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/target-sum/" },
  { id: 69, title: "Interleaving String", difficulty: "Medium", topic: "2D Dynamic Programming", pattern: "2D DP", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/interleaving-string/" },
  { id: 70, title: "Edit Distance", difficulty: "Hard", topic: "2D Dynamic Programming", pattern: "2D DP", companies: ["Google", "Facebook", "Amazon"], leetcodeUrl: "https://leetcode.com/problems/edit-distance/" },
  { id: 71, title: "Burst Balloons", difficulty: "Hard", topic: "2D Dynamic Programming", pattern: "Interval DP", companies: ["Google", "Amazon", "Facebook"], leetcodeUrl: "https://leetcode.com/problems/burst-balloons/" },
  { id: 72, title: "Regular Expression Matching", difficulty: "Hard", topic: "2D Dynamic Programming", pattern: "2D DP", companies: ["Google", "Facebook", "Uber"], leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/" },
  
  // Greedy
  { id: 73, title: "Maximum Subarray", difficulty: "Medium", topic: "Greedy", pattern: "Greedy Choice", companies: ["Google", "Amazon", "LinkedIn"], leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/" },
  { id: 74, title: "Jump Game", difficulty: "Medium", topic: "Greedy", pattern: "Greedy Choice", companies: ["Amazon", "Microsoft", "Google"], leetcodeUrl: "https://leetcode.com/problems/jump-game/" },
  { id: 75, title: "Merge Intervals", difficulty: "Medium", topic: "Intervals", pattern: "Interval Merging", companies: ["Facebook", "Google", "LinkedIn"], leetcodeUrl: "https://leetcode.com/problems/merge-intervals/" },
]

export default function DSAQuestionsList() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set())
  const [selectedTopic, setSelectedTopic] = useState<string>("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Load completed questions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dsa-completed')
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save completed questions to localStorage
  useEffect(() => {
    localStorage.setItem('dsa-completed', JSON.stringify(Array.from(completedQuestions)))
  }, [completedQuestions])

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompletedQuestions(newCompleted)
  }

  const topics = ["All", ...Array.from(new Set(dsaQuestions.map(q => q.topic)))]
  const difficulties = ["All", "Easy", "Medium", "Hard"]

  const filteredQuestions = dsaQuestions.filter(question => {
    const matchesTopic = selectedTopic === "All" || question.topic === selectedTopic
    const matchesDifficulty = selectedDifficulty === "All" || question.difficulty === selectedDifficulty
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.companies.some(company => company.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesTopic && matchesDifficulty && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Hard': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const completionRate = Math.round((completedQuestions.size / dsaQuestions.length) * 100)

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
          <span className="text-sm text-gray-600">
            {completedQuestions.size} / {dsaQuestions.length} completed
          </span>
        </div>
        <div className="mb-2 h-3 w-full rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">{completionRate}% Complete</p>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or companies..."
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedTopic("All")
                setSelectedDifficulty("All")
                setSearchQuery("")
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className={`rounded-xl border p-4 transition-all hover:shadow-md ${
              completedQuestions.has(question.id)
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleQuestion(question.id)}
                className="mt-1 flex-shrink-0"
              >
                {completedQuestions.has(question.id) ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-medium ${
                        completedQuestions.has(question.id) ? 'text-green-800 line-through' : 'text-gray-900'
                      }`}>
                        {question.title}
                      </h3>
                      {question.leetcodeUrl && (
                        <a
                          href={question.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        {question.topic}
                      </span>
                      <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                        {question.pattern}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {question.companies.map((company, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions match your current filters.</p>
        </div>
      )}
    </div>
  )
}