// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Dappbox {
    uint public fileCount = 0;
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    struct File {
        uint fileId;
        string fileHash;
        uint fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint uploadTime;
        address uploader;
    }
    mapping(address => File[]) public files;

    function uploadFile(
        string memory _fileHash,
        uint _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileDescription
    ) public {
        // require(bytes(_fileHash).length > 0, "Hash is required");
        fileCount++;
        files[msg.sender].push(
            File(
                fileCount,
                _fileHash,
                _fileSize,
                _fileType,
                _fileName,
                _fileDescription,
                block.timestamp,
                msg.sender
            )
        );
    }

    function retriveUserFiles(
        address _address
    ) public view returns (File[] memory) {
        return files[_address];
    }
}
