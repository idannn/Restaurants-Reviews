import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRestaurants } from "../../actions/restaurants";
import RestaurantCard from "./RestaurantCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Restaurants = ({
  getRestaurants,
  restaurants: { rest, first, index },
}) => {
  //const [Index, setIndex] = useState(0); // keep the current index to start from in the DB
  //useState not working because after page return it will reset the index to 0 again
  useEffect(() => {
    //run in the first page loading
    if (first) getRestaurants(index);
  }, [getRestaurants, index, first]);

  const fetchHandler = () => {
    //run after every scroll end
    getRestaurants(index);
  };
  return (
    <div className="landing">
      <div className="restaurants">
        {rest.length > 0 ? (
          <InfiniteScroll
            dataLength={rest.length}
            next={fetchHandler}
            hasMore={true}
            //loader={<h4>loading</h4>} add spinner
          >
            {rest.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </InfiniteScroll>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
});
export default connect(mapStateToProps, { getRestaurants })(Restaurants);
