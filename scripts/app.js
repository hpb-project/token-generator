var web3,
    provider,
    isMainNetwork,
    isRopsten,
    isRinkeby,
    isGoerli,
    isMetaMaskLocked,
    address;

var abi = [{"inputs":[{"internalType":"uint256","name":"totalsupply_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

var bytecode = '60806040523480156200001157600080fd5b50604051620016f6380380620016f68339818101604052810190620000379190620001f1565b82600390805190602001906200004f92919062000095565b5080600490805190602001906200006892919062000095565b5081600560006101000a81548160ff021916908360ff160217905550836002819055505050505062000470565b828054620000a3906200034d565b90600052602060002090601f016020900481019282620000c7576000855562000113565b82601f10620000e257805160ff191683800117855562000113565b8280016001018555821562000113579182015b8281111562000112578251825591602001919060010190620000f5565b5b50905062000122919062000126565b5090565b5b808211156200014157600081600090555060010162000127565b5090565b60006200015c6200015684620002ca565b620002a1565b9050828152602081018484840111156200017b576200017a6200041c565b5b6200018884828562000317565b509392505050565b600082601f830112620001a857620001a762000417565b5b8151620001ba84826020860162000145565b91505092915050565b600081519050620001d4816200043c565b92915050565b600081519050620001eb8162000456565b92915050565b600080600080608085870312156200020e576200020d62000426565b5b60006200021e87828801620001c3565b945050602085015167ffffffffffffffff81111562000242576200024162000421565b5b620002508782880162000190565b93505060406200026387828801620001da565b925050606085015167ffffffffffffffff81111562000287576200028662000421565b5b620002958782880162000190565b91505092959194509250565b6000620002ad620002c0565b9050620002bb828262000383565b919050565b6000604051905090565b600067ffffffffffffffff821115620002e857620002e7620003e8565b5b620002f3826200042b565b9050602081019050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015620003375780820151818401526020810190506200031a565b8381111562000347576000848401525b50505050565b600060028204905060018216806200036657607f821691505b602082108114156200037d576200037c620003b9565b5b50919050565b6200038e826200042b565b810181811067ffffffffffffffff82111715620003b057620003af620003e8565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b620004478162000300565b81146200045357600080fd5b50565b62000461816200030a565b81146200046d57600080fd5b50565b61127680620004806000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610d37565b60405180910390f35b6100e660048036038101906100e19190610b81565b610308565b6040516100f39190610d1c565b60405180910390f35b61010461032b565b6040516101119190610e39565b60405180910390f35b610134600480360381019061012f9190610b2e565b610335565b6040516101419190610d1c565b60405180910390f35b610152610364565b60405161015f9190610e54565b60405180910390f35b610182600480360381019061017d9190610b81565b61037b565b60405161018f9190610d1c565b60405180910390f35b6101b260048036038101906101ad9190610ac1565b6103b2565b6040516101bf9190610e39565b60405180910390f35b6101d06103fa565b6040516101dd9190610d37565b60405180910390f35b61020060048036038101906101fb9190610b81565b61048c565b60405161020d9190610d1c565b60405180910390f35b610230600480360381019061022b9190610b81565b610503565b60405161023d9190610d1c565b60405180910390f35b610260600480360381019061025b9190610aee565b610526565b60405161026d9190610e39565b60405180910390f35b60606003805461028590610f69565b80601f01602080910402602001604051908101604052809291908181526020018280546102b190610f69565b80156102fe5780601f106102d3576101008083540402835291602001916102fe565b820191906000526020600020905b8154815290600101906020018083116102e157829003601f168201915b5050505050905090565b6000806103136105ad565b90506103208185856105b5565b600191505092915050565b6000600254905090565b6000806103406105ad565b905061034d858285610780565b61035885858561080c565b60019150509392505050565b6000600560009054906101000a900460ff16905090565b6000806103866105ad565b90506103a78185856103988589610526565b6103a29190610e8b565b6105b5565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461040990610f69565b80601f016020809104026020016040519081016040528092919081815260200182805461043590610f69565b80156104825780601f1061045757610100808354040283529160200191610482565b820191906000526020600020905b81548152906001019060200180831161046557829003601f168201915b5050505050905090565b6000806104976105ad565b905060006104a58286610526565b9050838110156104ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e190610e19565b60405180910390fd5b6104f782868684036105b5565b60019250505092915050565b60008061050e6105ad565b905061051b81858561080c565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610625576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061c90610df9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068c90610d79565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516107739190610e39565b60405180910390a3505050565b600061078c8484610526565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461080657818110156107f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ef90610d99565b60405180910390fd5b61080584848484036105b5565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561087c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087390610dd9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e390610d59565b60405180910390fd5b6108f7838383610a8d565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561097d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097490610db9565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a109190610e8b565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a749190610e39565b60405180910390a3610a87848484610a92565b50505050565b505050565b505050565b600081359050610aa681611212565b92915050565b600081359050610abb81611229565b92915050565b600060208284031215610ad757610ad6610ff9565b5b6000610ae584828501610a97565b91505092915050565b60008060408385031215610b0557610b04610ff9565b5b6000610b1385828601610a97565b9250506020610b2485828601610a97565b9150509250929050565b600080600060608486031215610b4757610b46610ff9565b5b6000610b5586828701610a97565b9350506020610b6686828701610a97565b9250506040610b7786828701610aac565b9150509250925092565b60008060408385031215610b9857610b97610ff9565b5b6000610ba685828601610a97565b9250506020610bb785828601610aac565b9150509250929050565b610bca81610ef3565b82525050565b6000610bdb82610e6f565b610be58185610e7a565b9350610bf5818560208601610f36565b610bfe81610ffe565b840191505092915050565b6000610c16602383610e7a565b9150610c218261100f565b604082019050919050565b6000610c39602283610e7a565b9150610c448261105e565b604082019050919050565b6000610c5c601d83610e7a565b9150610c67826110ad565b602082019050919050565b6000610c7f602683610e7a565b9150610c8a826110d6565b604082019050919050565b6000610ca2602583610e7a565b9150610cad82611125565b604082019050919050565b6000610cc5602483610e7a565b9150610cd082611174565b604082019050919050565b6000610ce8602583610e7a565b9150610cf3826111c3565b604082019050919050565b610d0781610f1f565b82525050565b610d1681610f29565b82525050565b6000602082019050610d316000830184610bc1565b92915050565b60006020820190508181036000830152610d518184610bd0565b905092915050565b60006020820190508181036000830152610d7281610c09565b9050919050565b60006020820190508181036000830152610d9281610c2c565b9050919050565b60006020820190508181036000830152610db281610c4f565b9050919050565b60006020820190508181036000830152610dd281610c72565b9050919050565b60006020820190508181036000830152610df281610c95565b9050919050565b60006020820190508181036000830152610e1281610cb8565b9050919050565b60006020820190508181036000830152610e3281610cdb565b9050919050565b6000602082019050610e4e6000830184610cfe565b92915050565b6000602082019050610e696000830184610d0d565b92915050565b600081519050919050565b600082825260208201905092915050565b6000610e9682610f1f565b9150610ea183610f1f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610ed657610ed5610f9b565b5b828201905092915050565b6000610eec82610eff565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015610f54578082015181840152602081019050610f39565b83811115610f63576000848401525b50505050565b60006002820490506001821680610f8157607f821691505b60208210811415610f9557610f94610fca565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61121b81610ee1565b811461122657600080fd5b50565b61123281610f1f565b811461123d57600080fd5b5056fea2646970667358221220d6a2a62bada6375d9642a5fb2cf1654ab9ea2960d669632d320867f67cba1fb464736f6c63430008070033';

var metamaskStatus = $('#metamask-status');
var accountAddress = $('#current-address');
var currentNetwork = $('#current-network');
var iconLocked = $('#icon-locked');
var iconUnlocked = $('#icon-unlocked');
var metamaskLocked = $('#metamask-locked');
var metamaskUnlocked = $('#metamask-unlocked');

var assetForm = $('#asset-form');
var assetFormInput = $('#asset-form :input');

//刷新
var btnAgain = $('#btnAgain');

//disable all form input fields
assetFormInput.prop("disabled", true);

window.addEventListener('load', async () => {
    metamaskLocked.show();
    iconLocked.show();

    //reload window
    $('#btnAgain').bind('click',function(e){
        e.preventDefault();
        window.location.href=window.location.href;
    });

    // New ethereum provider
    if (window.ethereum) {
        console.log("New ethereum provider detected");
        // Instance web3 with the provided information
        web3 = new Web3(window.ethereum);
        // ask user for permission
        metamaskStatus
            .html('Please allow MetaMask to view your addresses')
            .css({
                "text-align": "center",
                "color": "#0000ff"
            })
            .show();
        window.ethereum.enable().then(function (abc) {
            // user approved permission
            console.log("abc ===>", abc)
            start()
        }).catch(function (error) {
            metamaskStatus.css({ "color": "#ff0000" })
            // user rejected permission
            if (error.code == 4001) {
                metamaskStatus.html('You reject the permission request, Please refresh to try again');
                console.log("User rejected the permission request.");
            } else if (error.code == -32002) {
                metamaskStatus.html("Metamask permission request is already pending</br>Open Metamask to allow")
                    .css({ "color": "#ffa500" });
            } else {
                metamaskStatus.html(error.message);
                console.error("Error while try to connect with Metamask", error);
            }
        });
    }
    // Old web3 provider
    else if (web3 && Object.keys(web3).length) {
        console.log("Old web3 provider detected");
        start()
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected || web3 not exits');
        metamaskStatus.html('You do not appear to be connected to the HPB network. To use this service and deploy your contract, we recommend using the <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask</a> plugin for Google Chrome, which allows your web browser to connect to the HPB network.').show();
    }
});

function handleAccountsChanged(accounts) {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
}

function handleChainChanged(_chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
}

function metamaskEvents() {
    ethereum.on('accountsChanged', handleAccountsChanged)
        .on('chainChanged', handleChainChanged)
        .on('connect', function (a, b, c) {
            debugger;
        })
        .on('disconnect', function (a, b, c) {
            debugger;
        })
        .on('message', function (a, b, c) {
            debugger;
        });
}

function start() {
   

    provider = web3.currentProvider;
    assetFormInput.prop("disabled", false);
    metamaskStatus.hide()
    // metamaskEvents()
    getEthNetworkId()
        .then(function (networkId) {
            if (networkId === '1') {
                isMainNetwork = true;
                currentNetwork.text('You are currently at Mainnet').show();
            } else if (networkId === '269') {
                isHpb = true;
                currentNetwork.text('Your are currently at HPB Network.').show();
            } else
                currentNetwork.text('Your current network id is ' + networkId).show();
        })
        .fail(function (err) {
            console.log(err)
        });

    setInterval(function () {
        isLocked()
            .then(function (isLocked) {
                if (isLocked) {
                    isMetaMaskLocked = true;
                    metamaskUnlocked.hide();
                    accountAddress.hide();
                    metamaskLocked.show();
                    iconLocked.show();
                    assetFormInput.prop("disabled", true);
                    throw Error("Metamask Locked");
                }
                metamaskUnlocked.show();
                iconUnlocked.show();
                metamaskLocked.hide();
                iconLocked.hide();

                return getAccount()
            })
            .then(function (account) {
                if (account.length > 0) {
                    if (isMetaMaskLocked) {
                        isMetaMaskLocked = false;
                        assetFormInput.prop("disabled", false);
                    }
                    address = account[0];
                    return getBalance(account[0]);
                }
            })
            .then(function (balance) {
                accountAddress.html('<strong>Selected Account: ' + address + ' (' + balance + ' hpb)</strong>').show();
            })
            .fail(function (err) {
                if (err.message !== "Metamask Locked")
                    console.log(err)
            });
    }, 1000);
}

function sendSync(params) {
    var defer = $.Deferred();
    provider.sendAsync(params, function (err, result) {
        if (err)
            return defer.reject(err.json());
        if (result['error'])
            return defer.reject(result['error']);
        defer.resolve(result)
    }
    );
    return defer.promise();
}

function getEthNetworkId() {
    return sendSync({ method: 'net_version', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err
        })
}

function requestAccounts() {
    return sendSync({ method: 'eth_requestAccounts' })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getAccount() {
    return sendSync({ method: 'eth_accounts', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getBalance(address) {
    return sendSync({ method: 'eth_getBalance', params: [address] })
        .then(function (result) {
            return web3.utils.fromWei(result['result']);
        })
        .fail(function (err) {
            return err;
        })
}

function isLocked() {
    return getAccount()
        .then(function (accounts) {
            return accounts.length <= 0;
        })
        .fail(function (err) {
            return err
        });
}


//call function on form submit
assetForm.submit(function (e) {
 
    //prevent the form from actually submitting.
    e.preventDefault();

    var initialSupply = $('#total-supply').val();
    var tokenName = $('#name').val();
    var decimalUnits = $('#decimals').val();
    var tokenSymbol = $('#symbol').val(); 

    if (tokenName === '') {
        alert('name can\'t be blank')
    } else if (tokenSymbol === '') {
        alert('symbol can\'t be blank')
    } else if (decimalUnits === '') {
        alert('decimals can\'t be blank')
    } else if (initialSupply === '') {
        alert('totalSupply can\'t be blank')
    } else {
        //disable all form input fields
        //自动处理18个0
        initialSupply = initialSupply  + '000000000000000000'; 

        assetFormInput.prop("disabled", true);
        statusText.innerHTML = 'Waiting for contract to be deployed...';
        var standardtokenContract = new web3.eth.Contract(abi);
        standardtokenContract.deploy({
            data: '0x' + bytecode,
            arguments: [initialSupply, tokenName, decimalUnits, tokenSymbol]
        }).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error); 
                assetFormInput.prop("disabled", false);
                return;
            }
            //
            $("#submit-btn").addClass("hide_btn");
            $("#btnAgain").removeClass("hide_btn");
            $('#btnAgain').removeAttr("disabled"); 

            console.log('Transaction Hash :', transactionHash);
            if (isMainNetwork) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12).<br> <strong>Transaction hash: </strong><br> <a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isHpb) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong>Transaction hash: </strong><br> <a href="https://hscan.org/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else
                statusText.innerHTML = 'Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). Transaction hash: ' + transactionHash
        }).on('confirmation', function () {
            return;
        }).then(function (newContractInstance) {
            if (!newContractInstance.options.address) {
                console.log(newContractInstance);
                return;
            }
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
            var newContractAddress = newContractInstance.options.address;
            if (isMainNetwork) {
                statusText.innerHTML = 'Transaction  mined! Contract address: <a href="https://etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isHpb) {
                statusText.innerHTML = 'Transaction  mined! Contract address: <a href="https://hscan.org/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else
                statusText.innerHTML = 'Contract deployed at address <b>' + newContractAddress + '</b> - keep a record of this.'
        }).catch(function (error) {
            console.error(error);
            assetFormInput.prop("disabled", false);
        })
    }
});

function nthRoot(x, n) {
    if (x < 0 && n % 2 != 1) return NaN; // Not well defined
    return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1 / n);
}

function showNameTip(){
    toastMsgWarn(
        "Tip Name",
        "Name is simply what you want to call your token, such as MyToken or SuperToken",
        "toast-top-center"
      );
}

function showSymbolTip(){
    toastMsgWarn(
        "Tip Symbol",
        "Symbol will be the ticker of your token, such as BTC or ETH (normally tokens have a 3 letter uppercase symbol).",
        "toast-top-center"
      );
}
function showTotalTip(){
    toastMsgWarn(
        "Tip Total Supply",
        "Total Supply will be number of tokens available. Token Total Supply <strong>VALUE</strong> " +
        "will be total number of tokens to the power of decimal places. (eg. if total supply is 1000 and" +
        "decimals is 18 then give 1000000000000000000000 as a value.)",
        "toast-top-center"
      );
}
function showDecimalTip(){
    toastMsgWarn(
        "Tip Decimals",
        "Decimals is how many decimal places your token can have, which determines how " + 
        "divisible it is. Generally tokens will have 18 decimals, which allows 1 token to be divided into " +
        "trillions of pieces (eg. with 18 decimals you could have as little as 0.000000000000000001 of a "+
        "token).",
        "toast-top-center"
      );
}

//提示消息
function toastMsgSuccess(mainTitle, subTitle, position) {
    //This Is Success Message  Top Center toast-top-center
    toastr.success(subTitle, mainTitle, {
      positionClass: position,
      timeOut: 2000,
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1,
    });
  }
  function toastMsgWarn(mainTitle, subTitle, position) {
    //This Is Success Message  Top Center toast-top-center
    toastr.warning(subTitle, mainTitle, {
      positionClass: position,
      timeOut: 0,
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1,
    });
  }
  
  function toastMsgError(mainTitle, subTitle, position) {
    //This Is Success Message  Top Center toast-top-center
    toastr.error(subTitle, mainTitle, {
      positionClass: position,
      timeOut: 2500,
      closeButton: true,
      debug: false,
      newestOnTop: !0,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1,
    });
  }
   
  function toastShowWait(mainTitle,subTitle,position){
    toastr.warning(subTitle,mainTitle , {
        positionClass: position,
        timeOut: 10000,
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        preventDuplicates: !0,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: !1
    });
  }
  function toastClear(){
    toastr.clear();
  }

$("#decimals").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#decimals-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$("#total-supply").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#total-supply-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    } else {
        //TODO:show token total supply will be on bottom of total supply input
        // $("#total-supply").keyup(function (e) {
        //     if ($("#decimals").val() && $('#total-supply').val()) {
        //         console.log(Math.trunc($('#total-supply').val() / Math.pow(10, $("#decimals").val()))
        //     }
        // })
    }
});
