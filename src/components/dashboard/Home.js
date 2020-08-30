import React, { useState } from 'react';
import vieuth from '../../vieuth.png';
import logo from './logo192.png';
import avatar from './avatar.png';
import './Home.css';
import $ from 'jquery';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import StudentOpportunityCard from '../SeperateComponents/StudentOpportunityCard';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
} from 'mdbreact';
import { useEffect } from 'react';
import { studentOppurtunityData } from '../../utils/fakeData';
import Spinner from '../layout/Spinner';




const allProjectsQuery = gql`
	query($title:String,$page: Int, $limit: Int,$orderBy:String) {
		searchProject(title:$title,page: $page, limit: $limit,orderBy:$orderBy) {
			totalPages
			totalDocs
			docs {
				_id
				title
				body
				start
				end
			}
		}
	}
`;

function Home(props) {
	const [width, setWidth] = useState(window.innerWidth);
	const [query, setQuery] = useState('');
	const [height, setHeight] = useState(window.innerHeight);
	const [orderBy,setOrderBy]=useState("title")
    const [pageCount, setPageCount] = useState(1);
    const[title,setTitle]=useState('')
	const limit = 8;
	const { loading, data } = useQuery(allProjectsQuery, {
		variables: {
            title:query,
			page: pageCount,
			limit: limit,
			orderBy:orderBy
		},
	});
	// const [applyProject,{loadingM,errorM,dataM}]=useMutation(applyProjectMutation,{
	//     onCompleted(cd){
	//         console.log("data here"+cd.applyForProject.project.body)
	//         console.log("Lodaing here"+loading)
	//         console.log("error here"+error)
	//     }
	// })
	// const handleClick=(id)=>{

	// }

	$('.btnGroup1').on('mousedown', function () {
		$('.btnGroup1').removeClass('btnStyle');
		$(this).addClass('btnStyle');
	});

	$('.btnGroup2').on('mousedown', function () {
		$('.btnGroup2').removeClass('btnStyle');
		$(this).addClass('btnStyle');
	});

	const updateWidthAndHeight = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};
	// const handleClick=()=>{

	// }
	useEffect(() => {
		console.log(query);
		window.addEventListener('resize', updateWidthAndHeight);

		return () => window.removeEventListener('resize', updateWidthAndHeight);
	}, [width, height]);
	const filterData = data ? data.searchProject.docs : null;
	const showData = query
		? filterData.filter((c) =>
				c.title.toLowerCase().includes(query.trim().toLowerCase())
		  )
		: filterData;
	return (
		<div>
			

			<div>
				<MDBContainer
					className="w-75"
					style={{
						backgroundColor: 'white',
						color: 'black',
						borderRadius: '12px',
						border: '4px solid lightgray',
						position: 'relative',
						height: '22vh',
					}}
				>
					<MDBContainer
						className="menu"
						style={{
							backgroundColor: 'white',
							borderRadius: '12px',
							border: '4px solid lightgray',
							position: 'absolute',
							top: '-35%',
							height: '15vh',
							width: '90%',
							left: '5%',
							textAlign: 'center',
							fontSize: '22px',
						}}
					>
						<MDBRow
							className="text-center  "
							style={{ marginTop: '1vh' }}
						>
							<MDBCol size="1" sm="1" md="2">
								<button className="btnStyle btnGroup1">
									<i className="fas fa-check-double"></i>
									<br />
									<small
										style={{
											fontSize:
												width < 500 ? '1.8vw' : '1vw',
										}}
									>
										<strong>All</strong>
									</small>
								</button>
							</MDBCol>

							<MDBCol size="2" sm="2" md="2">
								<button className="btnGroup btnGroup1">
									<i className="fas fa-trophy"></i>
									<br />
									<small
										style={{
											fontSize:
												width < 500 ? '1.8vw' : '1vw',
										}}
									>
										<strong>Competetions</strong>
									</small>
								</button>
							</MDBCol>
							<MDBCol size="2" sm="2" md="2">
								<button className="btnGroup btnGroup1">
									<i className="fas fa-question"></i>
									<br />
									<small
										style={{
											fontSize:
												width < 500 ? '1.8vw' : '1vw',
										}}
									>
										<strong>Quizes</strong>
									</small>
								</button>
							</MDBCol>
							<MDBCol size="2" sm="2" md="2">
								<button className="btnGroup btnGroup1">
									<i className="fas fa-laptop-code"></i>
									<br />
									<small
										style={{
											fontSize:
												width < 500 ? '1.8vw' : '1vw',
										}}
									>
										<strong>Hackthons</strong>
									</small>
								</button>
							</MDBCol>
							<MDBCol size="2" sm="2" md="2">
								<button className="btnGroup btnGroup1">
									<i className="fas fa-award"></i>
									<br />
									<small
										style={{
											fontSize:
												width < 500 ? '1.8vw' : '1vw',
										}}
									>
										<strong>Scholarships</strong>
									</small>
								</button>
							</MDBCol>
							<MDBCol size="2" sm="2" md="2">
								<button className="btnGroup btnGroup1">
									<i className="fas fa-briefcase"></i>
									<br />
									<small
										style={{
											fontSize:
												width < 500 ? '1.8vw' : '1vw',
										}}
									>
										<strong>Internships</strong>
									</small>
								</button>
							</MDBCol>
						</MDBRow>
					</MDBContainer >
					<MDBRow
						className=" menuBar"
						style={{ bottom: '-40%', zIndex: 1 }}
					>
						<MDBCol size="6">
							<input
								style={{ marginTop: '1%' }}
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="  Search"
								id="search-bar"
							/>
							<a href="#">
								<i
									className=" search-icon fas fa-search"
									style={{ marginTop: '0.5%' }}
								></i>
							</a>
							<div
								className="search-Results"
								style={{
									display:
										query && showData !== null
											? 'flex'
											: 'none',
								}}
							>
								<ul style={{ listStyle: 'none' }}>
									{showData &&
										showData.map((d, index) => (
											<li
												style={{ zIndex: 1 }}
												key={index}
											>
												{d.title}
											</li>
										))}
								</ul>
							</div>
						</MDBCol>
						<MDBCol
							size="2"
							style={{
								textAlign: 'center',
								marginRight: '-5%',
								marginLeft: '0',
							}}
						>
							<button className="btnStyle btnGroup2">
								<i className="img-fluid fas fa-check-double"></i>
								<br />
								<small
									style={{
										fontSize: width < 500 ? '1.8vw' : '1vw',
									}}
								>
									<strong>All</strong>
								</small>
							</button>
						</MDBCol>
						<MDBCol
							size="2"
							style={{
								textAlign: 'center',
								marginRight: '-5%',
							}}
						>
							<button className="btnGroup btnGroup2">
								<i className=" img-fluid far fa-eye"></i>
								<br />
								<small
									style={{
										fontSize: width < 500 ? '1.8vw' : '1vw',
									}}
								>
									<strong>Latest</strong>
								</small>
							</button>
						</MDBCol>
						<MDBCol
							size="2"
							style={{
								textAlign: 'center',
								marginRight: '-5%',
							}}
						>
							<button className="btnGroup btnGroup2">
								<i className="fas fa-hourglass-half"></i>
								<br />
								<small
									style={{
										fontSize: width < 500 ? '1.8vw' : '1vw',
									}}
								>
									<strong>Ending</strong>
								</small>
							</button>
						</MDBCol>
						<MDBCol
							size="2"
							style={{
								textAlign: 'center',
								marginRight: '-5%',
							}}
						>
							<button className="btnGroup btnGroup2">
								<i className="fas fa-stopwatch"></i>
								<br />
								<small
									style={{
										fontSize: width < 500 ? '1.8vw' : '1vw',
									}}
								>
									<strong>Expired</strong>
								</small>
							</button>
						</MDBCol>
					</MDBRow>
					
				</MDBContainer>
				<MDBRow className="ml-5 pl-3">
					<div className="d-flex justify-content-end">
						<select className="custom-select custom-select-sm mt-5 mr-5" onChange={(e)=>setOrderBy(e.target.value)}>
						{/* <option selected disabled>Sory By</option> */}
						<option  value="title">Title</option>
						<option  value="end">End Date</option>
						<option value="start">Start Date</option>
						</select>
						
						</div>
					</MDBRow>
				{loading ? (
					<Spinner />
				) : (
					<>
					
						<MDBRow>
							<MDBCol size='10'>
								{/* clickHandler={(id)=>{
                                            console.log("In  Home id :"+id)
                                            if(id){
                                                applyProject({
                                                variables:{
                                                    _id:id
                                                }
                                            })
                                            }
                                            
                                            }} */}
								<div
									style={{
										marginTop: '2rem',
										marginLeft: '2.3rem',
									}}
									className="container"
								>
									
									{data && (
										<MDBRow className="text-center">
											{showData.map(
												(opportunity, index) => {
													return (
														<StudentOpportunityCard
															data={opportunity}
															key={`st-op-${index}`}
														/>
													);
												}
											)}
										</MDBRow>
									)}
								</div>
							</MDBCol>
							<MDBCol size='2'></MDBCol>
						</MDBRow>
						<MDBContainer>
							<MDBRow className="d-flex justify-content-center mt-3">
								<MDBBtn
									className="p-1"
									disabled={pageCount == 1}
									onClick={() => {
										setPageCount(pageCount - 1);
									}}
								>
									Prev{' '}
								</MDBBtn>
								<MDBBtn
									className="p-1"
									disabled={
										data &&
										data.searchProject.docs.length !== limit
									}
									onClick={() => {
										setPageCount(pageCount + 1);
									}}
								>
									Next
								</MDBBtn>
							</MDBRow>
							<MDBRow className="d-flex justify-content-center">
								<small>
									<strong>{`PageNo. ${pageCount}`}</strong>
								</small>
							</MDBRow>
						</MDBContainer>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;


