import React , { useState, useEffect} from 'react'
import ReactDOMServer from 'react-dom/server';
import Blog1 from "/public/blog1.png";
import Blog2 from "/public/blog2.png";
import Blog3 from "/public/blog3.png";

const Blog = () => {
  
  const [ data, setData ] = useState()
  
  useEffect(()=>{
    fetchData()
  }, [])
  
  useEffect(()=>{
    console.log(data)
  }, [data])
  
  const fetchData = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/artikel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((resData) => {
      const newData = Object.keys(resData).map((id) => ({ ...resData[id], id }));
      setData(newData);
    })
  }
  
  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
    <div id="blog" className="flex flex-col gap-[130px] pt-16 bg-[#FAF3EC]">
      <div className="w-[75%] mx-auto flex justify-center flex-col gap-y-[30px] ">
        <p className="text-4xl font-bold leading-[65px] text-center mb-[30px] text-[#020556]">Blog</p>
        <div className="flex gap-x-[30px]">
    
    
    

    
    
    
          <div className="flex flex-col gap-y-[15px] py-28 " data-aos="fade-right">
            <img className="" src="" />
            <p className="text-[20px] font-bold text-justify text-[#252641]">{data[0].judul}</p>
            <p className="text-[15px]  font-normal text-justify text-[#696984]" id="konten"></p>
            <button className="text-left">Read More</button>
          </div>










          <div className="flex flex-col gap-y-[30px]" data-aos="fade-left">
          
          
          
          
          
          
            <div className="flex gap-3 ">
              <img className="w-[280px] h-[200px]" src="" />
              <span className="flex flex-col gap-y-[10px]">
                <p className="text-[20px] font-bold text-justify text-[#252641]">{data[0].judul}</p>
                <p className="text-[15px]  font-normal text-justify text-[#696984]" id="konten2"></p>
                <button className="text-left">Read More</button>
              </span>
            </div>



            
            
            
            
            
            
          </div>
        </div>
        
        
        
        
        
        
        <a href="/otherblog" className="mx-auto">
          <button className="mx-auto w-[170px] p-[10px] text-[#f48c06] border-[2px] border-[#f48c06] rounded-[20px] font-bold">
            <a href="/otherblog">Read More</a>{" "}
          </button>
        </a>
      </div>
    </div>
  );
}

export default Blog