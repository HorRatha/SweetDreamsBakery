/* CSS Styles for Clean Cakes Cards */
.Cakes-card {
    height: 350px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    transition: transform 0.5s, box-shadow 0.5s;
    cursor: pointer;
    border: none;
    background: var(--gradient);
    box-shadow: var(--shadow);
}

.Cakes-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: var(--shadow-hover);
}

.Cakes-image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--chocolate-light), var(--caramel));
}

.Cakes-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-slow);
}

.Cakes-card:hover .Cakes-image {
    transform: scale(1.1);
    opacity: 0.3;
}

.Cakes-emoji-display,
.Cakes-emoji-fallback {
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--vanilla), var(--caramel));
    transition: var(--transition-slow);
}

.Cakes-card:hover .Cakes-emoji-display,
.Cakes-card:hover .Cakes-emoji-fallback {
    transform: scale(1.2);
    opacity: 0.4;
}

.Cakes-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(0);
    transition: all 0.5s;
    color: var(--vanilla);
    background: rgba(0,0,0,0.4);
    text-align: center;
}

.Cakes-card:hover .Cakes-content {
    justify-content: flex-end;
    background: linear-gradient(transparent, rgba(0,0,0,0.9));
    padding-bottom: 30px;
}

.Cakes-content h3 {
    font-size: 1.4rem;
    margin-bottom: 5px;
    font-weight: bold;
    color: var(--vanilla);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    opacity: 1;
    transition: all 0.5s;
}

.Cakes-role {
    color: var(--strawberry);
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    opacity: 1;
    transition: all 0.5s;
}

.Cakes-description {
    line-height: 1.5;
    opacity: 0;
    transition: opacity 0.5s;
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: var(--vanilla);
}

.Cakes-card:hover .Cakes-description {
    opacity: 1;
    transition-delay: 0.2s;
}

.Cakes-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 20px;
    opacity: 0;
    transition: opacity 0.5s;
}

.Cakes-card:hover .Cakes-tags {
    opacity: 1;
    transition-delay: 0.25s;
}

.Cakes-tag {
    background: rgba(255, 255, 255, 0.2);
    color: var(--vanilla);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.Cakes-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s;
}

.Cakes-card:hover .Cakes-actions {
    opacity: 1;
    transition-delay: 0.3s;
}

.Cakes-card:hover .Cakes-content h3,
.Cakes-card:hover .Cakes-role {
    opacity: 0.9;
}

.btn-add-cart,
.btn-view-details {
    padding: 10px 16px;
    border: none;
    border-radius: 25px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.btn-add-cart {
    background: var(--strawberry);
    color: white;
}

.btn-add-cart:hover {
    background: var(--chocolate-dark);
    transform: scale(1.05);
}

.btn-view-details {
    background: rgba(255, 255, 255, 0.2);
    color: var(--vanilla);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.btn-view-details:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

/* Animation for card entrance */
.fade-in-Cakes {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s, transform 0.8s;
}

.fade-in-Cakes.visible {
    opacity: 1;
    transform: translateY(0);
}