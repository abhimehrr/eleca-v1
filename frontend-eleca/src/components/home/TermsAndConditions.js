import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Components
import Contact from '../partials/Contact'
import Footer from '../partials/Footer'
import BackToTop from '../partials/BackToTop'

export default function TermsAndConditions() {

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

  return (
    <>
    <motion.main initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3, ease: 'linear'}} className='text-gray-300 ml-3 mt-5 relative'>
        <Link to='/' className="title-font font-bold text-gray-300 hover:text-teal-500 transition-all md:mb-0">
          <span className="text-2xl">eleca .</span>
        </Link>

        <div className='divider mt-5 mb-4'></div>
        
        <h1 className='text-2xl font-bold text-teal-500'>Terms And Conditions</h1>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                1. Repair Services and Warranty :
            </h2>

            <li className='ml-5 my-2'>We provide repair services for various electronic items, such as fans, televisions, and LED TVs. However, please note that any existing warranty or guarantee on the product is rendered invalid once it has been repaired by us.</li>
            <li className='ml-5 my-2'>Repairs are carried out to the best of our abilities, aiming to restore the functionality of the item. However, we do not offer a warranty on the repaired items.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                2. Product Returns :
            </h2>

            <li className='ml-5 my-2'>Once a product is sold, we do not offer returns or exchanges. We encourage customers to thoroughly inspect products before making a purchase decision.</li>
            <li className='ml-5 my-2'>In the rare event of a manufacturing defect or malfunction that is identified immediately after purchase, please contact us within 24 hours to discuss a possible solution.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                3. Product Information :
            </h2>

            <li className='ml-5 my-2'>We strive to provide accurate and up-to-date information about our products. However, specifications, features, and availability may change without prior notice.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                4. Payment and Pricing :
            </h2>

            <li className='ml-5 my-2'>All prices are subject to change without notice. The price applicable is the one displayed at the time of purchase.</li>
            <li className='ml-5 my-2'>Payment for products and services must be made in full at the time of purchase or repair.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                5. Liability :
            </h2>

            <li className='ml-5 my-2'><span className='font-medium text-teal-500'>Ashok Electronics</span> is not liable for any direct, indirect, or consequential damages resulting from the use or inability to use our products or services.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                6. Privacy Policy :
            </h2>

            <li className='ml-5 my-2'>We respect your privacy and only collect necessary information to process transactions and provide services. Your personal information will not be shared with third parties without your consent.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                6. Force Majeure :
            </h2>

            <li className='ml-5 my-2'>We shall not be held responsible for any delays or failure to fulfill our obligations due to circumstances beyond our control, including but not limited to natural disasters, strikes, or government regulations.</li>
        </ul>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                5. Applicable Law :
            </h2>

            <li className='ml-5 my-2'>These terms and conditions are governed by the laws of <span className='font-medium text-teal-500'>Saharsa, Bihar</span>. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in <span className='font-medium text-teal-500'>Saharsa, Bihar</span>.</li>
        </ul>

        <p className='my-10 font-medium text-yellow-500'>
            By making a purchase or availing our services, you acknowledge that you have read, understood, and agreed to these terms and conditions.
        </p>

        <div className="divider my-10"></div>

        <h1 className='text-2xl font-bold text-teal-500'>नियम और शर्तें</h1>

        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                1. सर्विस और वारंटी :
            </h2>

            <li className='ml-5 my-2'>हम विभिन्न इलेक्ट्रॉनिक उपकरणों, जैसे कि पंखे, टेलीविजन, और एलईडी टीवी की सर्विस प्रदान करते हैं। हालांकि, कृपया ध्यान दें कि किसी भी मौजूदा वारंटी या गारंटी को हमारी तरफ से उपकरण की मरम्मत के बाद अमान्य कर दिया जाता है।</li>
            <li className='ml-5 my-2'>हम सर्विस करने के लिए अपनी सर्वोत्तम कोशिश करते हैं, उपकरण के कार्यक्षमता को पुनर्स्थापित करने का लक्ष्य रखते हैं। हालांकि, हम इसके बावजूद सर्विस की गारंटी नहीं प्रदान करते हैं।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                2. उत्पाद वापसी :
            </h2>

            <li className='ml-5 my-2'>एक बार उत्पाद बेच दिया जाता है, हम वापसी या आदलत के बदले की सुविधा नहीं प्रदान करते हैं। हम ग्राहकों से अनुरोध करते हैं कि वे उत्पादों की खरीदी की सोच-समझ कर करें।</li>
            <li className='ml-5 my-2'>नदीर घटना के बाद जो कुछ समय के भीतर पहचानी जाए, उसके बाद हमें 24 घंटे के भीतर संपर्क करें ताकि संभावित समाधान पर चर्चा की जा सके, हांलाकि यह घटनाघटित होने की बहुत अद्वितीय स्थिति होती है।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                3. उत्पाद जानकारी :
            </h2>

            <li className='ml-5 my-2'>हम अपने उत्पादों के बारे में सटीक और अप-टू-डेट जानकारी प्रदान करने का प्रयास करते हैं। हालांकि, विशिष्टताएँ, विशेषताएँ और उपलब्धता पहले सूचित किए बिना बदल सकती हैं।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                4. भुगतान और मूल्य :
            </h2>

            <li className='ml-5 my-2'>सभी मूल्य बिना पूर्व-सूचना के बदल सकते हैं। प्रायोगिक मूल्य वह होगा जो खरीद के समय प्रदर्शित होता है।</li>
            <li className='ml-5 my-2'>उत्पादों और सेवाओं के लिए भुगतान को खरीदी या मरम्मत के समय पूरा करना होगा।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                5. जिम्मेदारी :
            </h2>

            <li className='ml-5 my-2'><span className='font-medium text-teal-500'>अशोक इलेक्ट्रॉनिक्स</span> किसी भी सीधे, अप्रत्यक्ष या परिणामित हानियों के लिए जिम्मेदार नहीं है, जो हमारे उत्पादों या सेवाओं के उपयोग या असमर्थता से होते हैं।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                6. गोपनीयता नीति :
            </h2>

            <li className='ml-5 my-2'>हम आपकी गोपनीयता का आदर करते हैं और संचालनों की प्रसंस्करण और सेवाओं प्रदान करने के लिए आवश्यक जानकारी को ही एकत्र करते हैं। आपकी व्यक्तिगत जानकारी को आपकी सहमति के बिना तृतीय पक्षों के साथ साझा नहीं किया जाएगा।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                7. आवश्यकता के परिस्थितियों में :
            </h2>

            <li className='ml-5 my-2'>हम किसी भी कठिनाई या हानि से मुकाबला करने के लिए जिम्मेदार नहीं होंगे, जो हमारे नियंत्रण से बाहर के परिस्थितियों में हो सकती हैं, जैसे कि प्राकृतिक आपदाएँ, हड़तालें, या सरकारी विनियमन।</li>
        </ul>
        
        <ul className="list-disc list-inside mt-8">
            <h2 className='font-xl font-medium my-3'>
                8. लागू कानून :
            </h2>
            
            <li className='ml-5 my-2'>ये नियम और शर्तें <span className='font-medium text-teal-500'>सहरसा, बिहार </span> के कानूनों द्वारा प्रबंधित होते हैं। इन नियमों से उत्पन्न होने वाली किसी विवाद को <span className='font-medium text-teal-500'>सहरसा, बिहार </span> की अनन्य प्राधिकृतियों के अधीन सूचित किया जाएगा।</li>
        </ul>
        
        <p className='my-10 font-medium text-yellow-500'>खरीदारी या हमारी सेवाओं का लाभ उठाते समय, आप मानते हैं कि आपने इन नियमों और शर्तों को पढ़ा, समझा और स्वीकार किया है।</p>
        
        <div className="flex items-center justify-center p-4 bg-gray-900 rounded-lg">
            <Contact/>
        </div>

        <Footer/>
    </motion.main>

    {/* Back To Top */}
    <BackToTop/>
    
    </>
  )
}
