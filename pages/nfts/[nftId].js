import Header from '../../components/Header'
import React from 'react'
import { useEffect,useState, useMemo } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import { useRouter } from 'next/router'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'


const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
  }

const Nft = () =>{

    const {provider} = useWeb3();
    const [selectedNft,setSelectedNft] = useState()
    const [listings,setListings] = useState([])
    const router = useRouter()
     
    const nftModule = useMemo(() =>{
        if(!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner(),
        )

        return sdk.getNFTModule("0x292D4a8E48957ea6D94BF11Ac3c9033bFaC5c5Ea")
    }, [provider])

    useEffect(() => {
        if (!nftModule) return
        ;(async () => {
          const nfts = await nftModule.getAll()
    
          const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)
    
          setSelectedNft(selectedNftItem)
        })()
      }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
        provider.getSigner(),
        )
        return sdk.getMarketplaceModule(
        "0x2c9bE46072BaA9fbcea011Db6726b32b09b63C08"
        )
    }, [provider])

    useEffect(() => {
        if (!marketPlaceModule) return
        ;(async () => {
          setListings(await marketPlaceModule.getAllListings())
        })()
      }, [marketPlaceModule])


    return (<div>
        <Header />
        
        <div className={style.wrapper}>

            <div className={style.container}>
                <div className={style.topContent}>
                    <div className={style.nftImgContainer}>
                        <NFTImage selectedNft={selectedNft}/>
                    </div>
                    <div className={style.detailsContainer}>
                        <GeneralDetails selectedNft={selectedNft}/>
                        <Purchase isListed={router.query.isListed} selectedNft={selectedNft} listings={listings} marketPlaceModule={marketPlaceModule} />
                    </div>
                </div>
                <ItemActivity />
            </div>

        </div>

    </div>)
}

export default Nft