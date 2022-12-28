// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
    string public name = 'Storage';
    uint public count = 0;

    struct File {
        uint id;
        string hashStored;
        uint size;
        uint date;
        string fileType;
        string fileName;
        string intro;
        address payable sender;
    }
    mapping(uint => File) public files;

    event UploadedFile (
        uint id,
        string hashStored,
        uint size,
        uint date,
        string fileType,
        string fileName,
        string intro,
        address payable sender
    );

    function uploadFile(string memory hashStored, uint size, string memory fileType, string memory fileName, string memory intro) public {
        require(bytes(hashStored).length > 0);
        require(size > 0);
        require(bytes(fileType).length > 0);
        require(bytes(fileName).length > 0);
        require(address(0) != msg.sender);

        count += 1;
        files[count] = File(count, hashStored, size, block.timestamp, fileType, fileName, intro, payable(msg.sender));

        emit UploadedFile(count, hashStored, size, block.timestamp, fileType, fileName, intro, payable(msg.sender));
    }
}