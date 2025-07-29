// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleStorage
 * @dev 儲存和檢索數值的簡單合約
 * 這是學習 Solidity 的第一個範例合約
 */
contract SimpleStorage {
    // 狀態變量 - 儲存在區塊鏈上
    uint256 public favoriteNumber;
    
    // 事件 - 可以被前端監聽
    event NumberChanged(address indexed user, uint256 newNumber);
    
    /**
     * @dev 儲存一個數值
     * @param _favoriteNumber 要儲存的數值
     */
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
        emit NumberChanged(msg.sender, _favoriteNumber);
    }
    
    /**
     * @dev 檢索儲存的數值
     * @return 當前儲存的數值
     */
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}

/**
 * @title PersonalBank
 * @dev 個人銀行合約 - 學習存款和提款
 */
contract PersonalBank {
    // 每個地址的餘額
    mapping(address => uint256) public balances;
    
    // 事件
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    
    /**
     * @dev 存款功能
     */
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
    
    /**
     * @dev 提款功能
     * @param amount 提款金額
     */
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        
        emit Withdrawn(msg.sender, amount);
    }
    
    /**
     * @dev 查詢餘額
     */
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}

/**
 * @title MessageBoard
 * @dev 留言板合約 - 學習結構體和陣列
 */
contract MessageBoard {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }
    
    Message[] public messages;
    
    event MessagePosted(address indexed sender, string content, uint256 timestamp);
    
    /**
     * @dev 發布留言
     */
    function postMessage(string memory _content) public {
        require(bytes(_content).length > 0, "Message cannot be empty");
        
        messages.push(Message({
            sender: msg.sender,
            content: _content,
            timestamp: block.timestamp
        }));
        
        emit MessagePosted(msg.sender, _content, block.timestamp);
    }
    
    /**
     * @dev 獲取留言數量
     */
    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }
    
    /**
     * @dev 獲取特定留言
     */
    function getMessage(uint256 index) public view returns (
        address sender,
        string memory content,
        uint256 timestamp
    ) {
        require(index < messages.length, "Message does not exist");
        Message memory message = messages[index];
        return (message.sender, message.content, message.timestamp);
    }
}